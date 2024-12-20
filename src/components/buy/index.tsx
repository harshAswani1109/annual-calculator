"use client";

import React, { useState } from "react";
import axios from "axios";

const BuyComponent = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      await axios.post("/api/post-purchase", {
        timeStamp: date,
        number: number,
      });
      alert("Submission successful!");
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <div className="p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Buy Form
        </h1>

        <div className="space-y-6">
          {/* Number Input */}
          <div className="flex flex-col">
            <label htmlFor="number" className="mb-2 text-sm font-medium text-gray-100">
              Enter Number
            </label>
            <input
              id="number"
              type="number"
              value={number ?? ""}
              onChange={(e) => setNumber(Number(e.target.value) || null)}
              className="w-full p-3 border border-gray-300 rounded-md bg-white/40 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter a number"
            />
          </div>

          {/* Date Selector */}
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-2 text-sm font-medium text-gray-100">
              Select Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-white/40 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 text-lg font-semibold text-white rounded-md transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {/* Error Message */}
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default BuyComponent;
