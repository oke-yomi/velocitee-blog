"use client";

import supabase from "@/config/supabase";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { convertToSlug } from "@/utils/helper-func";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

const CreateBlog = () => {
  const router = useRouter();
  const [editorData, setEditorData] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !editorData.blocks || !formData.imageUrl) {
      setFormError("Please fill in all fields correctly");
    }

    const slug = convertToSlug(formData.title);
    const formDataWithSlug = {
      ...formData,
      description: JSON.stringify(editorData),
      slug,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert([formDataWithSlug])
      .select();

    if (error) {
      console.log(error);
      setFormError(error.message);

      return;
    }

    if (data) {
      //   console.log(data);
      setFormError(null);
      router.push("/");
    }
  };

  return (
    <div className="py-7">
      <h1 className="text-3xl font-semibold text-primary mb-10 underline capitalize">
        Create a New Blog Post
      </h1>

      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block font-medium capitalize text-secondary"
            >
              Blog Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border-2 rounded-md px-3 py-2 mt-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="imageUrl"
              className="block font-medium capitalize text-secondary"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="border-2 rounded-md px-3 py-2 mt-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="description"
              className="block font-medium capitalize text-secondary"
            >
              Description:
            </label>
            <Editor
              data={editorData}
              onChange={setEditorData}
              holder="editorjs-container"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-3 py-2 text-offwhite bg-secondary rounded-md"
            >
              Create Post
            </button>
          </div>

          {formError && <p>{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
