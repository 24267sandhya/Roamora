"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Loader2, ArrowRight, ArrowLeft, Plane, MapPin, Wallet, Train, Compass, CheckCircle2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const steps = [
  {
    id: "destinations",
    title: "Dream Destinations",
    subtitle: "Where do you want to go next?",
    icon: <MapPin className="w-6 h-6" />,
    options: ["Japan", "Italy", "Bali", "Iceland", "Costa Rica", "New Zealand", "Maldives", "Switzerland"]
  },
  {
    id: "budget",
    title: "Travel Budget",
    subtitle: "What's your typical spending style?",
    icon: <Wallet className="w-6 h-6" />,
    options: ["Backpacker ($)", "Moderate ($$)", "Comfort ($$$)", "Luxury ($$$$)"]
  },
  {
    id: "transport",
    title: "Getting Around",
    subtitle: "How do you prefer to travel?",
    icon: <Train className="w-6 h-6" />,
    options: ["Flights", "Trains", "Rental Cars", "Public Transit", "Walking"]
  },
  {
    id: "style",
    title: "Travel Style",
    subtitle: "What kind of traveler are you?",
    icon: <Compass className="w-6 h-6" />,
    options: ["Adventure", "Relaxation", "Cultural", "Foodie", "Nature", "Urban Explorer"]
  }
];

function OnboardingContent() {
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({
    destinations: [],
    budget: [],
    transport: [],
    style: []
  });
  const [loading, setLoading] = useState(false);

  const [customDestination, setCustomDestination] = useState("");
  const [customBudget, setCustomBudget] = useState("");

  const toggleSelection = (option: string) => {
    const stepId = steps[currentStep].id;
    setSelections(prev => {
      const current = prev[stepId];
      if (stepId === "budget") {
        return { ...prev, [stepId]: [option] };
      }
      if (current.includes(option)) {
        return { ...prev, [stepId]: current.filter(item => item !== option) };
      } else {
        return { ...prev, [stepId]: [...current, option] };
      }
    });
  };

  const handleCustomDestinationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customDestination.trim()) {
      e.preventDefault();
      const dest = customDestination.trim();
      if (!selections.destinations.includes(dest)) {
        setSelections(prev => ({
          ...prev,
          destinations: [...prev.destinations, dest]
        }));
      }
      setCustomDestination("");
    }
  };

  const handleCustomBudgetKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customBudget.trim()) {
      e.preventDefault();
      const budgetStr = customBudget.trim();
      setSelections(prev => ({
        ...prev,
        budget: [budgetStr] // Overwrite existing budget selection with custom string
      }));
      setCustomBudget("");
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setLoading(true);
      try {
        const token = await user?.getIdToken();
        const preferences = {
          favoriteDestinations: selections.destinations,
          budgetPatterns: selections.budget[0] || "Moderate ($$)",
          frequentlySelectedTransportModes: selections.transport,
          travelStyle: selections.style.join(", "),
          preferredHotels: [],
          preferredTravelPace: "Moderate",
          foodPreferences: [],
          vehiclePreferences: []
        };

        const res = await fetch("http://localhost:8000/api/users/preferences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(preferences)
        });

        if (res.ok) {
          await refreshProfile();
          router.push("/dashboard");
        } else {
          console.error("Failed to save preferences");
        }
      } catch (err) {
        console.error("Error saving preferences:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505] selection:bg-indigo-500/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="mb-8 flex justify-center space-x-2">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? "w-8 bg-indigo-500" : idx < currentStep ? "w-4 bg-indigo-500/50" : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>

        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl relative"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="flex items-center gap-4 mb-2 text-indigo-400">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              {step.icon}
            </div>
            <h2 className="text-3xl font-bold text-white">{step.title}</h2>
          </div>
          <p className="text-gray-400 mb-8 ml-[4.5rem]">{step.subtitle}</p>

          {step.id === "destinations" && (
            <div className="mb-6 relative">
              <input
                type="text"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                onKeyDown={handleCustomDestinationKeyDown}
                placeholder="Type a location and press Enter..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          )}

          {step.id === "budget" && (
            <div className="mb-6 relative">
              <input
                type="text"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                onKeyDown={handleCustomBudgetKeyDown}
                placeholder="Type a custom budget (e.g. ₹50,000) and press Enter..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {(() => {
              const combinedOptions = [...step.options];
              if (step.id === "destinations") {
                selections.destinations.forEach(dest => {
                  if (!combinedOptions.includes(dest)) {
                    combinedOptions.unshift(dest); // Put custom selections at the top
                  }
                });
              }
              if (step.id === "budget") {
                selections.budget.forEach(b => {
                  if (!combinedOptions.includes(b)) {
                    combinedOptions.unshift(b); // Put custom budget at the top
                  }
                });
              }

              return combinedOptions.map((option) => {
                const isSelected = selections[step.id].includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleSelection(option)}
                    className={`relative p-4 rounded-2xl text-left transition-all duration-200 overflow-hidden group ${
                      isSelected 
                        ? "bg-indigo-600 border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] text-white" 
                        : "bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
                    }`}
                  >
                    <span className="relative z-10 block font-medium truncate">{option}</span>
                    {isSelected && (
                      <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-indigo-200" />
                    )}
                    {!isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                );
              });
            })()}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-white/10">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || loading}
              className={`flex items-center px-6 py-3 text-sm font-medium rounded-xl transition-colors ${
                currentStep === 0 ? "opacity-0 cursor-default" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={selections[step.id].length === 0 || loading}
              className="flex items-center px-8 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingContent />
    </ProtectedRoute>
  );
}
