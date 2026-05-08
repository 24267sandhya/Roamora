import os
import json
import uuid
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from dotenv import load_dotenv

from models import TripRequest, TripResponse, DayItinerary

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

app = FastAPI(
    title="Roamora AI Travel API",
    description="Backend API for Roamora Travel Engine",
    version="0.1.0"
)

# Configure CORS for Next.js frontend
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Roamora API. The engine is running."}

@app.post("/api/generate-trip", response_model=TripResponse)
async def generate_trip(request: TripRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured")

    prompt = f"""
    You are an expert, highly intelligent AI travel agent.
    A user has requested a trip with the following details:
    - Destination: {request.destination}
    - Start Date: {request.startDate}
    - End Date: {request.endDate}
    - Budget: {request.budget}
    - Travel Style: {request.travelStyle}
    - Interests: {', '.join(request.interests)}
    - Target Currency: {request.userCurrency}

    Create a detailed daily itinerary for this trip. You MUST estimate all costs natively in the user's target currency ({request.userCurrency}), formatted appropriately with the correct currency symbol (e.g., €, ₹, $, £).
    You MUST return ONLY a valid JSON object matching the following structure (no markdown tags, no extra text):
    {{
      "tripId": "generate a unique string id",
      "destination": "{request.destination}",
      "totalDays": (calculate integer difference between dates + 1),
      "totalEstimatedCost": "estimate a total cost in {request.userCurrency} based on the budget as a string with symbol",
      "itinerary": [
        {{
          "day": (integer starting from 1),
          "date": "YYYY-MM-DD",
          "theme": "A catchy theme for the day",
          "activities": ["Activity 1", "Activity 2", "Activity 3"],
          "accommodation": "Suggest a real or realistic hotel/stay matching the budget",
          "estimatedCost": "estimated cost for the day in {request.userCurrency} as a string with symbol"
        }}
      ],
      "message": "A short, exciting welcome message for the traveler."
    }}
    """

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        # We tell the model we expect JSON format
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
            )
        )
        
        response_text = response.text
        # Parse the JSON string
        trip_data = json.loads(response_text)
        
        # Ensure it matches our Pydantic model
        trip_response = TripResponse(**trip_data)
        
        # Override tripId just to be safe
        trip_response.tripId = str(uuid.uuid4())
        
        return trip_response
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")
    except ValidationError as e:
        raise HTTPException(status_code=500, detail=f"AI returned data that failed validation: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
