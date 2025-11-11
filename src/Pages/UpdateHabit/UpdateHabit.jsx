import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateHabit = ({ habit, onClose, onUpdated }) => {
  if (!habit) return null; // ✅ Prevent rendering before data is ready

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    reminderTime: "",
    image: "",
    userName: "",
    userEmail: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fill formData when habit is available
  useEffect(() => {
    if (habit) {
      setFormData({
        title: habit.title || "",
        description: habit.description || "",
        category: habit.category || "",
        reminderTime: habit.reminderTime || "",
        image: habit.image || "",
        userName: habit.userName || "",
        userEmail: habit.userEmail || "",
      });
    }
  }, [habit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadForm = new FormData();
        uploadForm.append("image", imageFile);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
          uploadForm
        );
        imageUrl = imgRes.data.data.display_url;
      }

      const updatedData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        reminderTime: formData.reminderTime,
        image: imageUrl,
      };

      await axios.put(`http://localhost:3000/habit/${habit._id}`, updatedData);
      toast.success("Habit updated successfully!");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error("Failed to update habit!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Update Habit
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full"
            placeholder="Habit Title"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full rounded-xl"
            placeholder="Description"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full rounded-full"
            required
          >
            <option value="">Select Category</option>
            <option>Morning</option>
            <option>Work</option>
            <option>Fitness</option>
            <option>Evening</option>
            <option>Study</option>
          </select>

          <input
            type="time"
            name="reminderTime"
            value={formData.reminderTime}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="file-input file-input-bordered w-full rounded-full"
          />

          <input
            type="text"
            value={formData.userName}
            className="input input-bordered w-full rounded-full"
            readOnly
          />
          <input
            type="text"
            value={formData.userEmail}
            className="input input-bordered w-full rounded-full"
            readOnly
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn rounded-full bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHabit;
