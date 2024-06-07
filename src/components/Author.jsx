import React, { useEffect, useState } from "react";
import axios from "../axios/axios";

function Author() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user/allauthor");
        setAuthors(response.data.authors);
      } catch (error) {
        console.log("fetching author error", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log(authors);
  }, [authors]);

  return (
    <>
      <h1 className="text-2xl font-medium text-center">Our authors</h1>
    <div className="w-full h-full flex flex-wrap justify-center gap-10 p-5">
      {authors && authors.map((item, index) => (
        <div key={index} className="mb-6 flex flex-col items-center">
          <div className="w-32 h-32 bg-red-400 rounded-full overflow-hidden">
            <img
              className="object-fill object-center w-full h-full"
              src={item.avatar}
              alt={item.name}
            />
          </div>
          <div className="mt-2">
            <h1 className="text-lg font-semibold">{item.name}</h1>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Author;
