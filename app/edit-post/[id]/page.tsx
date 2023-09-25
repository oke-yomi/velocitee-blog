"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/config/supabase";
import { Post } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { convertToSlug } from "@/utils/helper-func";
import Editor from "@/components/Editor";

const EditBlog = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  });
  const [editorData, setEditorData] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        setFormError(error.message);

        return;
      }

      if (data) {
        setPost(data);
        setFormData({
          title: data.title,
          imageUrl: data.imageUrl,
        });

        try {
          const parsedData = JSON.parse(data.description);
          setEditorData(parsedData);
        } catch (e) {
          console.error("Error parsing editor data:", e);
        }

        setFormError(null);
      }
    };

    fetchPost();
  }, []);

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

      return;
    }

    const slug = convertToSlug(formData.title);
    const editorJson = JSON.stringify(editorData);
    const formDataWithSlug = { ...formData, description: editorJson, slug };

    const { data, error } = await supabase
      .from("posts")
      .update(formDataWithSlug)
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      setFormError(error.message);

      return;
    }

    if (data) {
      setFormError(null);
      const updatedPost = data[0];
      router.push(`/blog/${updatedPost.id}-${updatedPost.slug}`);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="py-7">
      <div>
        <h3 className="text-3xl font-semibold text-primary mb-10 underline capitalize">
          Update Blog Post
        </h3>

        <div className="mt-5">
          {post && (
            <form onSubmit={handleSubmit}>
              <div className="items-center flex justify-end gap-3 mb-5">
                <button
                  type="submit"
                  className="rounded-md px-2 py-1 bg-secondary text-offwhite"
                >
                  Update Post
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-md px-2 py-1 bg-primary text-offwhite"
                >
                  Cancel
                </button>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="block font-medium capitalize text-secondary"
                >
                  Blog Title:{" "}
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
            </form>
          )}
        </div>

        {formError && <p>{formError}</p>}
      </div>
    </div>
  );
};

export default EditBlog;
