import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-habits/${user.email}`)
        .then((res) => setHabits(res.data))
        .catch(() => toast.error("Failed to load habits"));
    }
  }, [user]);

  // Delete habit
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;

    try {
      await axios.delete(`http://localhost:3000/habit/${id}`);
      setHabits(habits.filter((habit) => habit._id !== id));
      toast.success("Habit deleted successfully!");
    } catch {
      toast.error("Failed to delete habit!");
    }
  };

  // Mark as complete
  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:3000/habit/${id}`, {
        completed: true,
      });
      toast.success("Habit marked as complete!");
    } catch {
      toast.error("Failed to update habit!");
    }
  };

  return (
    <div className="my-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">My Habits</h2>

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
                <td>{habit.streak || 0}</td>
                <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleComplete(habit._id)}
                    className="btn btn-xs bg-green-500 text-white"
                  >
                    Mark Complete
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
