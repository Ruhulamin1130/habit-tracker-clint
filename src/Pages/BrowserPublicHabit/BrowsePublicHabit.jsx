import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all public habits from backend
    axios
      .get("http://localhost:3000/habit") // assuming your backend returns all habits
      .then((res) => setHabits(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load public habits");
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/habit/${id}`);
  };

  return (
    <div className="my-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Browse Public Habits
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <div
            key={habit._id}
            className="card bg-base-100 shadow-md border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Image */}
            <img
              src={
                habit.image ||
                "https://via.placeholder.com/400x250?text=Habit+Image"
              }
              alt={habit.title}
              className="w-full h-48 object-cover"
            />

            {/* Body */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {habit.title || "Untitled Habit"}
              </h3>
              <p className="text-gray-600 mb-3">
                {habit.description?.slice(0, 80) || "No description available"}
              </p>

              {/* Creator */}
              <div className="flex items-center gap-2 mb-3">
                {habit.creatorPhoto ? (
                  <img
                    src={habit.creatorPhoto}
                    alt={habit.creatorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                )}
                <span className="text-sm text-gray-700">
                  {habit.creatorName || "Unknown"} ({habit.creatorEmail})
                </span>
              </div>

              {/* See Details button */}
              <button
                onClick={() => handleViewDetails(habit._id)}
                className="btn btn-sm w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePublicHabits;
