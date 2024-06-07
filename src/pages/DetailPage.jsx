import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import {  useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../context/authContext";
import NotFound from "./NotFound";


function DetailPage() {

  const { id } = useParams();
  const navigate = useNavigate()
  const [singleBlog, setSingleBlog] = useState({});
  const {isAuthorized} = useAuth();
  const [loading, setLoading] = useState(false);
  const fetchSingleBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/blog/getsinglepost/${id}`);
      setSingleBlog(response.data.blog);
      setLoading(false);
    } catch (error) {
      console.log("error in fetching sinle blog data", error);
    }
  };
  useEffect(() => {
    fetchSingleBlog();
  }, []);
  console.log(singleBlog);

  return (
    isAuthorized === false ? (
      <NotFound />
    ) : (
      <div className="w-full min-h-screen">
        {!loading ? (
          <div className="w-full h-full p-4 md:p-10">
            <div className="w-full md:w-56 h-24 bg-zinc-200 rounded-md flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={singleBlog.authorAvatar}
                  alt="avatar"
                />
              </div>
              <div className="mt-2 text-center">
                <h1 className="text-sm md:text-base">Author Name: {singleBlog.authorName}</h1>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center bg-zinc-200 mt-10 p-4">
              <div className="w-full md:w-1/2 overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={singleBlog.mainImage}
                  alt="image"
                />
              </div>
              <div className="mt-10 md:mt-0 md:ml-4 p-4 w-full md:w-1/2">
                <h1 className="text-sm md:text-base">
                  <b>Description:</b> {singleBlog.description}
                </h1>
              </div>
            </div>

            {(singleBlog.imageOne || singleBlog.descriptionOne) && (
              <div className="flex flex-col md:flex-row justify-center items-center bg-zinc-200 mt-10 p-4">
                <div className="w-full md:w-1/2 overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={singleBlog.imageOne}
                    alt="image"
                  />
                </div>
                <div className="mt-10 md:mt-0 md:ml-4 p-4 w-full md:w-1/2">
                  <h1 className="text-sm md:text-base">
                    <b>Description:</b> {singleBlog.descriptionOne}
                  </h1>
                </div>
              </div>
            )}

            {(singleBlog.imageTwo || singleBlog.descriptionTwo) && (
              <div className="flex flex-col md:flex-row justify-center items-center bg-zinc-200 mt-10 p-4">
                <div className="w-full md:w-1/2 overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={singleBlog.imageTwo}
                    alt="image"
                  />
                </div>
                <div className="mt-10 md:mt-0 md:ml-4 p-4 w-full md:w-1/2">
                  <h1 className="text-sm md:text-base">
                    <b>Description:</b> {singleBlog.descriptionTwo}
                  </h1>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    )
  );
}

export default DetailPage;
