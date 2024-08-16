"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar2";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("title", title);
    formData.append("descriptions", descriptions);
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://myarticle-website.onrender.com/api/v1/newblog/firstblog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/");
        setFullName("");
        setTitle("");
        setDescriptions("");
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen mt-24 mb-4 px-4 lg:px-0">
        <div className="border border-gray-300 p-6 lg:p-10 shadow-lg w-full max-w-lg bg-white rounded-lg">
          <h1 className="text-center lg:text-2xl text-xl font-semibold mb-4">
            Please, Create Your First Article/Blog.
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Name..."
                className="w-full px-4 py-2 border text-base lg:text-xl border-gray-400 font-medium focus:border-indigo-300 rounded"
              />
            </div>
            <div>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="w-full px-4 py-2 border text-base lg:text-xl border-gray-400 font-medium focus:border-indigo-300 rounded"
              />
            </div>
            <div>
              <textarea
                required
                placeholder="Enter Description..."
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
                className="w-full px-4 py-2 border text-base lg:text-xl border-gray-400 font-medium focus:border-indigo-300 rounded"
                rows="4"
              />
            </div>
            <div>
              <input
                type="file"
                title="Choose file"
                onChange={handleImageChange}
                className="w-full text-gray-600"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="mt-4 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>

            {loading ? (
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded font-bold transition-all duration-200"
                disabled
              >
                Loading... Please wait
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded font-bold transition-all duration-200"
              >
                Submit
              </button>
            )}

            <Link href={"/"}>
              <button
                type="button"
                className="w-full px-6 py-2 mt-2 bg-gray-500 text-white hover:bg-gray-600 rounded font-bold transition-all duration-200"
              >
                Go Back
              </button>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
