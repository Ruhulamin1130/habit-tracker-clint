import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { FaRegImage, FaClock, FaTag, FaPlus } from "react-icons/fa";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [habitImage, setHabitImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload image to ImgBB
  const uploadImage = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=d05b8613f2b5db893147b1f4fb4d5904`,
        formData
      );
      return res.data.data.url;
    } catch (err) {
      toast.error("Image upload failed!");
      return null;
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const category = e.target.category.value;
    const reminderTime = e.target.reminderTime.value;

    if (!title || !description || !category || !reminderTime) {
      toast.error("Please fill all required fields!");
      setLoading(false);
      return;
    }

    let imageUrl = null;
    if (habitImage) {
      imageUrl = await uploadImage(habitImage);
    }

    const habitData = {
      title,
      description,
      category,
      reminderTime,
      image: imageUrl,
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "https://habit-tracker-one-ashen.vercel.app/habit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(habitData),
        }
      );

      if (!res.ok) throw new Error("Failed to add habit");

      toast.success("Habit added successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-xl max-w-lg mx-auto my-10 p-6 border-2 border-pink-300 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-pink-400 text-center flex items-center justify-center gap-2">
        <FaPlus /> Add New Habit
      </h1>

      <form onSubmit={handleAddHabit} className="space-y-4">
        <div>
          <label className="label flex items-center gap-2">
            <FaPlus className="text-pink-500" /> Habit Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Habit Title"
            className="input w-full rounded-full border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none px-4 py-2"
          />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <FaPlus className="text-pink-500" /> Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="input w-full rounded-xl h-24 border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none px-4 py-2"
          ></textarea>
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <FaTag className="text-pink-500" /> Category
          </label>
          <select
            name="category"
            className="input w-full rounded-full border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none px-4 py-2"
          >
            <option value="">Select Category</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <FaClock className="text-pink-500" /> Reminder Time
          </label>
          <input
            type="time"
            name="reminderTime"
            className="input w-full rounded-full border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none px-4 py-2"
          />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <FaRegImage className="text-pink-500" /> Upload Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="input w-full rounded-full border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none px-4 py-2"
            onChange={(e) => setHabitImage(e.target.files[0])}
          />
        </div>

        <div>
          <label className="label">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input w-full rounded-full bg-gray-100 px-4 py-2"
          />
        </div>

        <div>
          <label className="label">User Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input w-full rounded-full bg-gray-100 px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full mt-4 rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white hover:opacity-90 flex items-center justify-center gap-2"
        >
          <FaPlus /> {loading ? "Adding..." : "Add Habit"}
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
