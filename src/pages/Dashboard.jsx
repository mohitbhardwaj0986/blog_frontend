import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";
import axios from "../axios/axios";
import Card from "../components/Card";
import { useAuth } from "../context/authContext";
import NotFound from "./NotFound";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const { isAuthorized } = useAuth();
  const { user } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [privat, setPrivat] = useState([]);
  console.log(privat);
  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/blog/myblogs");
        setBlogs(response.data.blogs);
        setLoading(false);

        const privateBlogs = await axios.get("/blog/private/blog");
        setPrivat(privateBlogs.data.blogs);
      } catch (error) {
        console.log("error to fetch all blog", error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <>
  {!isAuthorized || user.user.role === "reader" ? (
    <NotFound />
  ) : (
    <div className="w-full min-h-screen bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen ">
          {user && (
            <aside className="bg-zinc-300 w-full sm:w-full lg:w-1/3 p-5">
              <div className="w-full lg:w-56 h-24 bg-zinc-200 rounded-md flex flex-col justify-center items-center border border-zinc-400 mx-auto lg:mx-0">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={user.user.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="mt-2 text-center">
                  <h1 className="text-lg font-semibold">Author Name: {user.user.name}</h1>
                </div>
              </div>
              <div className="mt-5 text-center lg:text-left">
                <Link
                  to="/blog/post"
                  className="inline-block hover:text-blue-600 hover:font-medium"
                >
                  Post blog
                </Link>
              </div>
            </aside>
          )}

          <main className="w-full lg:w-2/3  p-5">
            <section className="w-full h-full">
              {blogs.length === 0 ? (
                <h1 className="text-center text-3xl font-medium">
                  No blogs available yet!
                </h1>
              ) : (
                <div className="max-w-7xl mx-auto h-full flex flex-wrap gap-5">
                  {blogs?.map((item) => (
                    <Card
                      key={item._id}
                      id={item._id}
                      name={item.authorName}
                      avatar={item.authorAvatar}
                      title={item.title}
                      bg={item.mainImage}
                      authorId={item.authorId}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="mt-10">
              <h1 className="text-center text-3xl font-medium">
                Private Blogs
              </h1>
              <div className="w-full min-h-full mt-5">
                {privat.length === 0 ? (
                  <h1 className="text-center text-xl mt-20 mb-20 font-medium">
                    No private blogs available yet!
                  </h1>
                ) : (
                  <div className="max-w-7xl mx-auto h-full flex flex-wrap gap-5">
                    {privat?.map((item) => (
                      <Card
                        key={item._id}
                        id={item._id}
                        name={item.authorName}
                        avatar={item.authorAvatar}
                        title={item.title}
                        bg={item.mainImage}
                        authorId={item.authorId}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  )}
</>
  );
}

export default Dashboard;
