import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import axios from "../axios/axios";
import laodinGif from "../assets/loading.gif"; 

function Card({ name, title, avatar, bg, id, authorId }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const deletePostHandle = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.delete(`/blog/postdelete/${id}`);
      console.log(id);

    } catch (error) {
     console.log("error in delete post", error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <div 
        style={{
          background: `url(${bg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="cardbg lg:w-96 h-auto lg:h-48 overflow-hidden rounded-md text-white p-5"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={avatar}
            alt=""
          />
        </div>
        <h1 className="mt-2">Author Name: {name}</h1>
        <h1>Title: {title}</h1>
        <Link
          to={`/blog/details/${id}`}
          className="cardbtn inline-block px-2 py-1 text-white font-semibold rounded-md mt-2 text-sm"
        >
          More details
        </Link>
        {user &&
          user.user._id === authorId &&
          (loading ? (
            <img className="w-12 " src={laodinGif} alt="loading" />
          ) : (
            <button
              onClick={(e) => deletePostHandle(e, id)} // Corrected parameter passing
              className="ml-3 cardbtn inline-block px-2 py-1 text-white font-semibold rounded-md mt-2 text-sm"
            >
              Delete
            </button>
          ))}
          <Link
          to={`/update/${id}`}
          className="cardbtn inline-block ml-3 px-2 py-1 text-white font-semibold rounded-md mt-2 text-sm"
        >
          Update
        </Link>
      </div>
    </div>
  );
}

export default Card;
