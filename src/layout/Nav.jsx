import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useUser } from "../context/userContext";
import { useAuth } from "../context/authContext";
import laodinGif from "../assets/loading.gif"
import axios from "../axios/axios";
import { RxHamburgerMenu } from "react-icons/rx";

function Nav() {
  const { user, setUser } = useUser();
  const { isAuthorized, setIsAuthorized } = useAuth();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [hambuger,setHambuger] = useState(false)
  console.log(user);
  const navData = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "All Posts",
      path: "/allposts",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];
  const handleLogout = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/user/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");
      setUser(null);
      setIsAuthorized(false);
      navigate("/login");
      setLoading(false)
    } catch (error) {
      setIsAuthorized(true);
      console.error(error.response.error);
    }
  };

  return (
    <>
      <div className=" flex justify-between items-center ">
      
        <div>
          <img src={logo} alt="logo" className="w-[20vw]" />
        </div>
        <button onClick={()=>setHambuger(!hambuger)} className="hamburger-button hidden mr-6 text-xl" >{<RxHamburgerMenu />}</button>
        <div className={`hamburger top-0 ${hambuger?"-left-0":"-left-64"} duration-300 flex flex-col items-end`}>
          <ul className="hamburger-ul flex gap-10 justify-center items-center mr-10">
            {navData.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ))}
            {!isAuthorized && (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-500 px-2 py-1 text-white font-semibold rounded-md"
              >
                Login
              </button>
            )}
            {isAuthorized && (
            loading ?<img className="w-12 " src={laodinGif} alt="loading" /> : <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-500 px-2 py-1 text-white font-semibold rounded-md"
              >
                Logout
              </button>
            )}
          </ul>
          <div>
          { user && user.user.role ==="author" && (
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-green-600 hover:bg-green-500 px-2 py-1 text-white font-semibold rounded-md mr-10 mt-3"
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
