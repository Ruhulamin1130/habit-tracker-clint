import React from "react";
import Banner from "../../components/Banner";
import { useLoaderData } from "react-router";
import FuturedHabitCard from "../FuturedHabitCard/FuturedHabitCard";
import WhyBuildCrd from "../WhyBuldCrd/WhyBuildCrd";
import HowItWorks from "../HowItWorks/HowItWorks";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <div className="w-full">
        <Banner></Banner>
      </div>
      <div className="w-11/12 mx-auto">
        <h2 className="text-center font-bold text-3xl my-10 text-pink-400">
          Futured Habits
        </h2>
        <div className="grid grid-cols-1  md:grid-cols-3 gap-4 ">
          {data.map((habit) => (
            <FuturedHabitCard key={habit._id} habit={habit}></FuturedHabitCard>
          ))}
        </div>
      </div>
      <div className="w-11/12 mx-auto my-8">
        <div>
          <WhyBuildCrd></WhyBuildCrd>
        </div>
        <div>
          <HowItWorks></HowItWorks>
        </div>
        <div>
          <Testimonials></Testimonials>
        </div>
      </div>
    </div>
  );
};

export default Home;
