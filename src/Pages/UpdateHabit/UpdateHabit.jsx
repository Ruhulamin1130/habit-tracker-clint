import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaImage } from "react-icons/fa";
import Spinner from "../../components/Spinner";

const UpdateHabit = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    reminderTime: "",
    image: "",
    isPublic: false,
  });

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await axios.get(
          `https://habit-tracker-one-ashen.vercel.app/habit/${id}`
        );
        setHabit(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          reminderTime: res.data.reminderTime,
          image: res.data.image,
          isPublic: res.data.isPublic,
        });
      } catch {
        toast.error("Failed to load habit");
      } finally {
        setLoading(false);
      }
    };
    fetchHabit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://habit-tracker-one-ashen.vercel.app/habit/${id}`,
        {
          ...formData,
        }
      );
      toast.success("Habit updated successfully!");
      navigate("/myhabit");
    } catch {
      toast.error("Failed to update habit");
    }
  };

  if (loading) return <Spinner></Spinner>;

  if (!habit)
    return (
      <div className="text-center text-3xl font-bold text-pink-400 h-screen mt-10 py-10">
        Habit not found! Go to My Habits and click update <br />
        <Link
          className="btn text-white bg-pink-400 mt-4 inline-block"
          to={"/myhabit"}
        >
          Go to My Habits
        </Link>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-2xl shadow-lg border border-pink-300">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center">
        Update Habit
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-100 rounded-xl"
          placeholder="Title"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-100 rounded-xl"
          rows={4}
          placeholder="Description"
          required
        ></textarea>

        {/* Category */}
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input input-bordered w-full border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-100 rounded-xl"
          placeholder="Category"
          required
        />

        {/* Reminder */}
        <input
          type="time"
          name="reminderTime"
          value={formData.reminderTime}
          onChange={handleChange}
          className="input input-bordered w-full border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-100 rounded-xl"
        />

        {/* Image */}
        <div className="flex items-center gap-2 border border-pink-300 rounded-xl px-3 py-2">
          <FaImage className="text-pink-500" />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full focus:outline-none"
          />
        </div>

        {/* Public */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="checkbox checkbox-pink-500"
          />
          <label className="text-gray-700 font-medium">Make Public</label>
        </div>

        {/* User info (read-only) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 border border-pink-300 rounded-xl px-3 py-2">
            <FaUser className="text-pink-500" />
            <input
              type="text"
              value={habit.creatorName}
              readOnly
              className="w-full bg-gray-100 focus:outline-none rounded-xl"
              placeholder="User Name"
            />
          </div>
          <div className="flex items-center gap-2 border border-pink-300 rounded-xl px-3 py-2">
            <FaEnvelope className="text-pink-500" />
            <input
              type="email"
              value={habit.creatorEmail}
              readOnly
              className="w-full bg-gray-100 focus:outline-none rounded-xl"
              placeholder="Email"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-gradient-to-r from-pink-500 to-red-600 text-white mt-4 rounded-full hover:opacity-90 transition-all"
        >
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default UpdateHabit;
