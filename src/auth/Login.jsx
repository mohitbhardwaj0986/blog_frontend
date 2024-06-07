import React, { useState } from "react";

import Input from "../components/Input";
import Select from "../components/Select";
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useUser } from "../context/userContext";
import laodinGif from "../assets/loading.gif"

function Login() {
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useAuth();
  const loginHandle = async (data) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post("/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      response && setUser(response.data);
      response && setIsAuthorized(true);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isAuthorized", true);
      reset();
      navigate("/");
      setLoading(false);
      console.log(user);
    } catch (error) {
      console.error(
        "Error response:",
        error.response?.data?.error || error.message
        
      );
      setLoading(false)
      setError(error.response?.data?.message || "An error occurred");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");
    }
  };
if (isAuthorized) {
  navigate("/");
}
  return (
    <div className="loginpage h-[95vh] relative flex items-center justify-center bg-gray-100">
  <div className="loginblur relative w-full h-full flex flex-col lg:flex-row items-center justify-center">
    <div className="hidden lg:block lg:absolute lg:top-36 lg:left-20">
      
    </div>
    <div className="loginform w-[90vw] lg:w-[40vw] h-auto lg:h-[65vh] bg-white rounded-2xl p-10 shadow-lg">
      <h1 className="text-center font-medium text-xl mb-5">
        Login your Account
      </h1>
      {error && (
        <h2 className="text-center text-red-600">{error} Try Again</h2>
      )}
      <h3 onClick={() => navigate('/register')} className="cursor-pointer text-center text-blue-800 underline mb-3">Sign Up</h3>
      <form onSubmit={handleSubmit(loginHandle)}>
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email address must be a valid address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            maxLength: {
              value: 15,
              message: "Password must be at most 15 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Select
        className="mt-3"
          label="role"
          {...register("role", {
            required: "Role is required",
          })}
          options={["select one", "author", "reader"]}
        />
        {errors.role && (
          <p className="text-red-500">{errors.role.message}</p>
        )}
        {loading ? (
          <img className="w-12 mx-auto" src={laodinGif} alt="loading" />
        ) : (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white font-semibold rounded-md mt-5 w-full"
          >
            Login Account
          </button>
        )}
      </form>
    </div>
  </div>
</div>
  );
}

export default Login;
