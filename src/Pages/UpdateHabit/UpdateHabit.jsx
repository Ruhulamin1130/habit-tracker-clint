import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

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
        const res = await axios.get(`http://localhost:3000/habit/${id}`);
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
      await axios.put(`http://localhost:3000/habit/${id}`, {
        ...formData,
      });
      toast.success("Habit updated successfully!");
      navigate("/myhabit");
    } catch {
      toast.error("Failed to update habit");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!habit)
    return (
      <div className="text-center text-3xl font-bold text-pink-400 h-screen mt-10 py-10">
        Habit not found! First Go to my habit and click update button <br />
        <Link className="btn text-white bg-pink-400" to={"/myhabit"}>
          Go to my habit
        </Link>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-2xl shadow-lg">
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
          className="input input-bordered w-full"
          placeholder="Title"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
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
          className="input input-bordered w-full"
          placeholder="Category"
          required
        />

        {/* Reminder */}
        <input
          type="time"
          name="reminderTime"
          value={formData.reminderTime}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        {/* Image */}
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Image URL (optional)"
        />

        {/* Public */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="checkbox"
          />
          <label>Make Public</label>
        </div>

        {/* User info (read-only) */}
        <input
          type="text"
          value={habit.creatorName}
          readOnly
          className="input input-bordered w-full bg-gray-100"
          placeholder="User Name"
        />
        <input
          type="email"
          value={habit.creatorEmail}
          readOnly
          className="input input-bordered w-full bg-gray-100"
          placeholder="Email"
        />

        <button
          type="submit"
          className="btn bg-pink-500 hover:bg-pink-600 text-white mt-4"
        >
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default UpdateHabit;
