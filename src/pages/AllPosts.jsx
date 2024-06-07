import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "../axios/axios";
import Loader from "./Loader"

function AllPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      const fetchAllPosts = async () => {
        setLoading(true);
      try {
        const response = await axios.get("/blog/getallpost");
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.log("error to fetch all blog", error);
      }
    };
    fetchAllPosts();
  }, []);

  console.log(blogs);
  return (
    <div className="w-full min-h-screen ">
      <div className=" max-w-7xl  h-full flex gap-5 flex-wrap p-5 pl-11 mx-auto">
        {loading ? (
       <Loader/>
        ) : (
          blogs.map((item) => (
            <Card
              key={item._id}
              id = {item._id}
              name={item.authorName}
              avatar={item.authorAvatar}
              title={item.title}
              bg ={item.mainImage}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AllPosts;
