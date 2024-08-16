
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Footer from "@/components/Footer";

export default function Home() {
  const [posts, setPosts] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/newblog/getAllBlog",
          { withCredentials: true }
        );
        console.log(response.data);
        setPosts(response.data.posts); // Access the posts array from response
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <main className="flex min-h-screen flex-col mt-28 ">
        <h1 className="lg:text-3xl sm:text-2xl md:text-2xl font-bold text-center mt-5">
          Welcome to My Blog or Article
        </h1>

        <div className="lg:w-[70%] sm:w-[90%] md:w-[90%] mx-auto lg:px-6 md:px-3 sm:px-3 py-3 mt-4 text-center">
          {loading && <p className=" font-bold text-xl">Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && posts.length > 0 ? (
            posts.map((item) => (
              <div
                key={item._id}
                className=" border-2 border-slate-200 bg-slate-100 lg:p-10 mb-4 rounded shadow sm:p-3 md:p-4 "
              >
                <h2 className="Lg:text-2xl sm:text-xl md:text-xl font-bold mb-4">
                  {item.title}
                </h2>

                {item.image && (
                  <div className=" mb-4">
                    <img
                      className="w-full h-auto rounded-md object-cover p-3"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                )}

                <p className=" mb-4 lg:text-xl sm:text-[16px] md:text-[16px] font-sans font-medium">
                  {item.descriptions}
                </p>
                <p className="text-gray-600 text-start lg:font-medium lg:text-[16px] sm:text-[10px] md:text-[10px] px-3 ">
                  Published on: {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-start font-medium lg:text-[16px] sm:text-[10px] md:text-[10px] px-3">
                  CreatedBy: {item.fullName}
                </p>
              </div>
            ))
          ) : (
            <p className=" font-bold text-xl">No posts available.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
