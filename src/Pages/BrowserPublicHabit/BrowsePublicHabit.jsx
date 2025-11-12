import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { motion } from "framer-motion";

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
      .get("https://habit-tracker-one-ashen.vercel.app/habit")
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
          className="border p-2 rounded-full w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border transition font-medium ${
              selectedCategory === category
                ? "bg-pink-500 text-white border-pink-500 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-pink-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit, index) => (
            <motion.div
              key={habit._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300"
            >
              <div className="h-48 w-full overflow-hidden rounded-t-2xl">
                <img
                  src={
                    habit.image ||
                    "https://via.placeholder.com/400x250?text=Habit+Image"
                  }
                  alt={habit.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {habit.title || "Untitled Habit"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                  {habit.description || "No description available"}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  {habit.creatorPhoto ? (
                    <img
                      src={habit.creatorPhoto}
                      alt={habit.creatorName}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {habit.creatorName || "Unknown"} ({habit.creatorEmail})
                  </span>
                </div>

                <button
                  onClick={() => handleViewDetails(habit._id)}
                  className="btn w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md transition-all duration-300"
                >
                  See Details
                </button>
              </div>
            </motion.div>
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
