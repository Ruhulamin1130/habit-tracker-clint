import React from "react";
import Banner from "../../components/Banner";

const Home = () => {
  return (
    <div>
      <div className="w-full">
        <Banner></Banner>
      </div>
      <div>
        <h2 className="text-center font-bold text-2xl my-4 text-pink-400">
          Futured Habits
        </h2>
      </div>
    </div>
  );
};

export default Home;
