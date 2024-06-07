import React, { useState } from "react";

import Input from "../components/Input";
import Select from "../components/Select";
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useUser } from "../context/userContext";
import laodinGif from "../assets/loading.gif";

function Register() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useAuth();
  console.log(isAuthorized);

  const registerHandle = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "avatar" && data[key][0]) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      for (const pair of formData.entries()) {
        pair[0] + ": " + pair[1];
      }

      const response = await axios.post("/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      response && setUser(response.data);
      response && setIsAuthorized(true);

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isAuthorized", "true");
      setIsAuthorized(true);

      reset();

      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error(
        "Error response:",
        error.response?.data?.error || error.message
      );
      setError(error.response?.data?.message || "An error occurred");
      setIsAuthorized(false);
      localStorage.removeItem("isAuthorized");
      localStorage.removeItem("user");
      setLoading(false);
    }
  };
  if (isAuthorized) {
    navigate("/");
  }
  return (
    <div className="loginpage h-[95vh] relative">
      <div className="loginblur relative">
        <h1 className="absolute text-white text-4xl md:text-6xl top-20 md:top-36 left-5 md:left-20">
          Think Fast.
        </h1>
        <h1 className="absolute text-white text-4xl md:text-6xl left-5 md:left-20 top-36 md:top-56">
          break Nothing.
        </h1>
        <div className="loginform w-[90vw] md:w-[60vw] lg:w-[40vw] h-auto md:h-[85vh] bg-white absolute top-20 md:top-7 right-5 md:right-20 rounded-2xl p-5 md:p-10">
          <h1 className="text-center font-medium text-lg md:text-xl mb-3 md:mb-5">
            Login to your Account
          </h1>
          {error && (
            <h2 className="text-center text-red-600">{error} Try Again</h2>
          )}
          <h3
            onClick={() => navigate("/login")}
            className="text-center text-blue-800 underline mb-3 cursor-pointer"
          >
            Login
          </h3>
          <form onSubmit={handleSubmit(registerHandle)}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be at most 20 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
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
              label="Avatar"
              type="file"
              {...register("avatar", {
                required: "Avatar is required",
              })}
            />
            {errors.avatar && (
              <p className="text-red-500">{errors.avatar.message}</p>
            )}
            <Select
              label="Role"
              {...register("role", {
                required: "Role is required",
              })}
              options={["select one", "author", "reader"]}
            />
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
            {loading ? (
              <img className="w-12" src={laodinGif} alt="loading" />
            ) : (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 px-2 py-1 text-white font-semibold rounded-md mt-5"
              >
                Create Account
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
