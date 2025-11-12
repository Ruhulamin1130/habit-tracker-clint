import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import Spinner from "../../components/Spinner";

const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/habit")
      .then((res) => setHabits(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load public habits");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/habit/${id}`);
  };

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || habit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 🔹 Spinner use
  if (loading) return <Spinner />;

  return (
    <div className="my-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-400 text-center mb-6">
        Browse Public Habits
      </h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search habits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === category
                ? "bg-pink-500 text-white border-pink-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit) => (
            <div
              key={habit._id}
              className="card bg-base-100 shadow-md border border-gray-200 rounded-xl overflow-hidden"
            >
              <img
                src={
                  habit.image ||
                  "https://via.placeholder.com/400x250?text=Habit+Image"
                }
                alt={habit.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {habit.title || "Untitled Habit"}
                </h3>
                <p className="text-gray-600 mb-3">
                  {habit.description?.slice(0, 80) ||
                    "No description available"}
                </p>
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
                <button
                  onClick={() => handleViewDetails(habit._id)}
                  className="btn btn-sm w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No habits found
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowsePublicHabits;
