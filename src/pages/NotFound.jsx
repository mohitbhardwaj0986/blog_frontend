import React from "react";
import { Link } from "react-router-dom";
import notFound from "../assets/404.svg";
import { useAuth } from "../context/authContext";
function NotFound() {
    const {isAuthorized} = useAuth();
  return (
    <div className="max-w-xl mx-auto flex flex-col justify-center items-center ">
      <img className="ops" src={notFound} />

     {
        isAuthorized ?  <Link
        className=" inline-block bg-[#3498DB] hover:bg-blue-500 px-2 py-1 text-white font-semibold rounded-md mt-10"
        to="/"
      >
        login
      </Link>: <Link
        className=" inline-block bg-[#3498DB] hover:bg-blue-500 px-2 py-1 text-white font-semibold rounded-md mt-10"
        to="/login"
      >
        login
      </Link>
     }
    </div>
  );
}

export default NotFound;
