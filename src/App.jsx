import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import { useUser } from "./context/userContext";
import Register from "./auth/Register";
import Home from "./pages/Home";
import {useAuth}  from './context/authContext'
import Login from "./auth/Login";
import AllPosts from "./pages/AllPosts";
import DetailPage from "./pages/DetailPage";
import PostBlogs from "./pages/PostBlogs";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import UpdataForm from "./pages/UpdataForm";
function App() {
  const {user, setUser } = useUser();
  const {isAuthorized, setIsAuthorized} = useAuth();
console.log(user);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthorized = localStorage.getItem("isAuthorized");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedIsAuthorized === "true") {
      setIsAuthorized(true);
    }
  }, [setUser, setIsAuthorized]);
  // console.log(user);
  console.log(isAuthorized);


  return (
    <>
      <Nav />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/blog/details/:id" element={<DetailPage />} />
        <Route path="/blog/post" element={<PostBlogs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/update/:id" element={<UpdataForm />} />
        <Route path="*" element={<NotFound />} />
  
      </Routes>
      <Footer />
    </>
  );
}

export default App;
