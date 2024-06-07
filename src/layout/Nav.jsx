import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useUser } from "../context/userContext";
import { useAuth } from "../context/authContext";
import laodinGif from "../assets/loading.gif";
import axios from "../axios/axios";
import { RxHamburgerMenu } from "react-icons/rx";

function Nav() {
  const { user, setUser } = useUser();
  const { isAuthorized, setIsAuthorized } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);

  const navData = [
    { name: "Home", path: "/" },
    { name: "All Posts", path: "/allposts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/user/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");
      setUser(null);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      setIsAuthorized(true);
      console.error(error.response?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <img src={logo} alt="logo" className="w-[20vw]" />
        </div>
        <button
          onClick={() => setHamburger(!hamburger)}
          className="lg:hidden mr-6 text-xl"
        >
          <RxHamburgerMenu />
        </button>
        <div className={`fixed top-0 ${hamburger ? "left-0" : "-left-full"} w-64 bg-white h-full lg:static lg:flex lg:w-auto lg:h-auto lg:bg-transparent lg:p-0 duration-300`}>
          <ul className="flex flex-col lg:flex-row gap-10 justify-center items-center p-5 lg:p-0">
            {navData.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} onClick={() => setHamburger(false)}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            {!isAuthorized && (
              <button
                onClick={() => {
                  setHamburger(false);
                  navigate("/login");
                }}
                className="bg-blue-600 hover:bg-blue-500 px-2 py-1 text-white font-semibold rounded-md"
              >
                Login
              </button>
            )}
            {isAuthorized && (
              loading ? (
                <img className="w-12" src={laodinGif} alt="loading" />
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-500 px-2 py-1 text-white font-semibold rounded-md"
                >
                  Logout
                </button>
              )
            )}
          </ul>
          <div className="lg:hidden">
            {user && user.user.role === "author" && (
              <button
                onClick={() => {
                  setHamburger(false);
                  navigate("/dashboard");
                }}
                className="bg-green-600 hover:bg-green-500 px-2 py-1 text-white font-semibold rounded-md mt-3"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
