from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# ─── User Models ───────────────────────────────────────────────────────────────
class UserPreferences(BaseModel):
    favoriteDestinations: List[str] = []
    budgetPatterns: str = "Medium"
    preferredHotels: List[str] = []
    preferredTravelPace: str = "Moderate"
    foodPreferences: List[str] = []
    vehiclePreferences: List[str] = []
    frequentlySelectedTransportModes: List[str] = []
    travelStyle: str = ""

class UserProfile(BaseModel):
    uid: str
    email: str
    name: Optional[str] = None
    photoUrl: Optional[str] = None
    role: str = "user" # user, premium user, admin
    preferences: Optional[UserPreferences] = Field(default_factory=UserPreferences)
    savedTrips: List[str] = []
    bookingHistory: List[str] = []
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class UserCreate(BaseModel):
    uid: str
    email: str
    name: Optional[str] = None
    photoUrl: Optional[str] = None


# ─── Trip Planning Models ──────────────────────────────────────────────────────
class TripRequest(BaseModel):
    destination: str
    startDate: str
    endDate: str
    budget: str
    interests: List[str]
    travelStyle: str
    userCurrency: str = "INR"
    groupSize: int = 2


class DayItinerary(BaseModel):
    day: int
    date: str
    theme: str
    activities: List[str]
    accommodation: str
    estimatedCost: str


class TripResponse(BaseModel):
    tripId: str
    destination: str
    totalDays: int
    totalEstimatedCost: str
    itinerary: List[DayItinerary]
    message: str


# ─── Hotel Booking Models ──────────────────────────────────────────────────────
class HotelBookingRequest(BaseModel):
    hotelId: str
    hotelName: str
    roomType: str
    checkIn: str
    checkOut: str
    guests: int
    totalAmount: float
    guestName: str
    guestEmail: str


class HotelBookingResponse(BaseModel):
    bookingId: str
    hotelId: str
    hotelName: str
    roomType: str
    checkIn: str
    checkOut: str
    guests: int
    totalAmount: float
    status: str
    confirmationCode: str
    createdAt: str


# ─── Vehicle Booking Models ────────────────────────────────────────────────────
class VehicleBookingRequest(BaseModel):
    vehicleId: str
    vehicleName: str
    pickupDate: str
    returnDate: str
    pickupLocation: str
    totalDays: int
    totalAmount: float
    driverName: str
    driverEmail: str


class VehicleBookingResponse(BaseModel):
    bookingId: str
    vehicleId: str
    vehicleName: str
    pickupDate: str
    returnDate: str
    pickupLocation: str
    totalDays: int
    totalAmount: float
    status: str
    confirmationCode: str
    createdAt: str
