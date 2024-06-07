import React from "react";
import Author from "../components/Author";
import HomePageSection1 from "../components/HomePageSection1";

function Home() {
  return (
    <>
      <div className="home">
        <section className="hero bg-blue-600">
          <div className="herolayer p-6 md:p-12 lg:p-24 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl w-full md:w-[55vw] text-white mt-10 md:mt-20">
              Discover, Learn, and Share Insights
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl w-full md:w-3/4 lg:w-2/3 mt-3 md:mt-5 text-white">
              Welcome to our blog site! Explore insightful articles, discover
              new ideas, and share your thoughts with a vibrant community. Join
              us on a journey of learning and growth.
            </p>
          </div>
        </section>
        <Author />
        <HomePageSection1 />
      </div>
    </>
  );
}

export default Home;
