import React from "react";
import home1 from "../assets/home1.avif";
import home2 from "../assets/home2.avif";
import home3 from "../assets/home3.jpg";

function HomePageSection1() {
  return (
    <>
      
      <div className="w-full">
        <div className="w-full h-full flex flex-col lg:flex-row items-center mb-10">
          <div className="w-full lg:w-1/2">
            <img
              className="w-full h-full object-cover"
              src={home1}
              alt="Home 1"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 lg:p-20">
            <h1 className="text-2xl lg:text-3xl font-medium">
              Insights and Inspirations: Your Daily Blog Digest
            </h1>
            <p className="mt-4 lg:mt-6">
              Welcome to Thought Streams! Dive into daily reflections and fresh
              perspectives from diverse voices. Discover creative chronicles
              that inspire and inform. Join our community of curious minds and
              share your insights.
            </p>
          </div>
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row-reverse items-center mb-10">
          <div className="w-full lg:w-1/2">
            <img
              className="w-full h-full object-cover"
              src={home2}
              alt="Home 2"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 lg:p-20">
            <h1 className="text-2xl lg:text-3xl font-medium">
              Thoughts Unleashed: A Blog for Curious Minds
            </h1>
            <p className="mt-4 lg:mt-6">
              Mindful Moments offers bite-sized wisdom to brighten your day.
              Explore stories and ideas that resonate with your journey. Stay
              updated with our latest posts and connect with fellow readers.
            </p>
          </div>
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row items-center mb-10">
          <div className="w-full lg:w-1/2">
            <img
              className="w-full h-full object-cover"
              src={home3}
              alt="Home 3"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 lg:p-20">
            <h1 className="text-2xl lg:text-3xl font-medium">
              Journeys and Reflections: Stories from Every Walk of Life
            </h1>
            <p className="mt-4 lg:mt-6">
              Insight Hub is your go-to source for thought-provoking content.
              From personal anecdotes to in-depth analyses, find articles that
              spark curiosity and conversation. Engage, reflect, and grow with
              us.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageSection1;
