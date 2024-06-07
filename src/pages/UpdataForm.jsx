import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import laodinGif from "../assets/loading.gif";
import { useParams } from "react-router-dom";

function UpdataForm() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const updateBlog = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(`blog/updateblog/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      reset();
      console.log(response);
      console.log("success");
    } catch (error) {
      console.log(
        "error in update blog",
        error.response?.data?.error || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-zinc-200">
      <form
        className="w-11/12 max-w-xl mx-auto py-6 px-4 md:px-8 lg:px-12 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit(updateBlog)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Update Blog</h2>

        <Input
          className="mb-5"
          label="Title"
          placeholder="Title"
          {...register("title", {
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
        {errors.title && (
          <span className="text-sm text-red-600">{errors.title.message}</span>
        )}

        <TextArea
          className="mb-5"
          label="Description"
          placeholder="Description"
          {...register("description", {
            minLength: {
              value: 3,
              message: "Description must be at least 3 characters",
            },
            maxLength: {
              value: 250,
              message: "Description must be at most 250 characters",
            },
          })}
        />
        {errors.description && (
          <span className="text-sm text-red-600">
            {errors.description.message}
          </span>
        )}

        <TextArea
          className="mb-5"
          label="Description (Optional)"
          placeholder="Description"
          {...register("descriptionOne")}
        />

        <TextArea
          className="mb-5"
          label="Description (Optional)"
          placeholder="Description"
          {...register("descriptionTwo")}
        />

        <Select
          className="mb-5"
          label="Public or Private"
          {...register("isPublic", {
            required: "Please select visibility",
            validate: (value) =>
              value === "true" ||
              value === "false" ||
              "Please select a valid option",
          })}
          options={["Select One", "true", "false"]}
        />
        {errors.isPublic && (
          <span className="text-sm text-red-600">
            {errors.isPublic.message}
          </span>
        )}

        {loading ? (
          <img className="w-12 mx-auto" src={laodinGif} alt="loading" />
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white font-semibold rounded-md mt-5"
          >
            Post blog
          </button>
        )}
      </form>
    </div>
  );
}

export default UpdataForm;
