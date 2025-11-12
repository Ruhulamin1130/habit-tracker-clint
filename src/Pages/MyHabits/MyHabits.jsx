import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://habit-tracker-one-ashen.vercel.app/my-habits/${user.email}`
        )
        .then((res) => setHabits(res.data))
        .catch(() => toast.error("Failed to load habits"));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;

    try {
      await axios.delete(
        `https://habit-tracker-one-ashen.vercel.app/habit/${id}`
      );
      setHabits(habits.filter((habit) => habit._id !== id));
      toast.success("Habit deleted successfully!");
    } catch {
      toast.error("Failed to delete habit!");
    }
  };

  // Navigate to UpdateHabit page
  const handleUpdate = (id) => {
    navigate(`/update-habit/${id}`);
  };

  return (
    <div className="my-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-400 text-center mb-6">
        My Habits
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Current Streak</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit._id}>
                <td>{habit.title}</td>
                <td>{habit.category}</td>
                <td>{habit.currentStreak || 0}</td>
                <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => navigate(`/habit/${habit._id}`)}
                    className="btn btn-xs bg-green-500 text-white"
                  >
                    Compleate
                  </button>
                  <button
                    onClick={() => handleUpdate(habit._id)}
                    className="btn btn-xs bg-blue-500 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="btn btn-xs bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHabits;
