import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import loadingGif from "../assets/loading.gif";

function PostBlogs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const postBlog = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        if ((key === "mainImage" || key === "imageOne" || key === "imageTwo") && data[key][0]) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await axios.post("/blog/postblog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
      console.log(response);
      console.log("success");
    } catch (error) {
      console.log("error in post blog", error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-zinc-200 py-10 px-4">
      <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit(postBlog)}>
        <Input
          className="mb-5"
          label="Title"
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
            maxLength: {
              value: 25,
              message: "Title must be at most 25 characters",
            },
          })}
        />
        {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}

        <TextArea
          className="mb-5"
          label="Description"
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 3,
              message: "Description must be at least 3 characters",
            },
            maxLength: {
              value: 500,
              message: "Description must be at most 500 characters",
            },
          })}
        />
        {errors.description && <span className="text-sm text-red-600">{errors.description.message}</span>}

        <Input
          className="mb-5"
          label="Main Image"
          type="file"
          {...register("mainImage", {
            required: "Main Image is required",
          })}
        />
        {errors.mainImage && <span className="text-sm text-red-600">{errors.mainImage.message}</span>}

        <TextArea
          className="mb-5"
          label="Description (Optional)"
          placeholder="Description"
          {...register("descriptionOne")}
        />

        <Input className="mb-5" label="Image (Optional)" type="file" {...register("imageOne")} />

        <TextArea
          className="mb-5"
          label="Description (Optional)"
          placeholder="Description"
          {...register("descriptionTwo")}
        />

        <Input className="mb-5" label="Image (Optional)" type="file" {...register("imageTwo")} />
        <h1 className="text-xl">Do you wnat show in public</h1>
        <Select
          className="mb-5"
          label="Public or Private"
          {...register("isPublic", {
            required: "Please select visibility",
          })}
          options={["Select One", "true", "false"]}
        />
        {errors.isPublic && <span className="text-sm text-red-600">{errors.isPublic.message}</span>}

        {loading ? (
          <div className="flex justify-center mt-5">
            <img className="w-12" src={loadingGif} alt="loading" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white font-semibold rounded-md mt-5"
          >
            Post Blog
          </button>
        )}
      </form>
    </div>
  );
}

export default PostBlogs;
