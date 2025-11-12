import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import { useLoaderData } from "react-router";
import FuturedHabitCard from "../FuturedHabitCard/FuturedHabitCard";
import WhyBuildCrd from "../WhyBuldCrd/WhyBuildCrd";
import HowItWorks from "../HowItWorks/HowItWorks";
import Testimonials from "../Testimonials/Testimonials";
import Spinner from "../../components/Spinner";

const Home = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);

  // Simulate loading for professional spinner effect
  useEffect(() => {
    if (data) {
      setTimeout(() => setLoading(false), 500); // 0.5s delay for smooth loading
    }
  }, [data]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Banner */}
      <div className="w-full">
        <Banner />
      </div>

      {/* Featured Habits */}
      <div className="w-11/12 mx-auto my-12">
        <h2 className="text-center text-4xl font-extrabold mb-8 text-pink-500">
          Featured Habits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((habit) => (
            <FuturedHabitCard key={habit._id} habit={habit} />
          ))}
        </div>
      </div>

      {/* Why Build Habits */}
      <div className="w-11/12 mx-auto my-16">
        <WhyBuildCrd />
      </div>

      {/* How It Works */}
      <div className="w-11/12 mx-auto my-16">
        <HowItWorks />
      </div>

      {/* Testimonials */}
      <div className="w-11/12 mx-auto my-16">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
