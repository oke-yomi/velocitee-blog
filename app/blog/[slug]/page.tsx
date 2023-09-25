"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/config/supabase";
import { Post } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PreviewRenderer from "@/components/PreviewRenderer";
import { BsPencil, BsTrash } from "react-icons/bs";
import Image from "next/image";

const BlogPost = () => {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const router = useRouter();

  const slugParts = slug.split("-");
  const id = slugParts[0];

  const [formError, setFormError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<string>("");
  const [commentError, setCommentError] = useState<string | null>(null);
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
        const parsedData = JSON.parse(data.description);
        setEditorData(parsedData);
        setFormError(null);
      }
    };

    fetchPost();
  }, [comment, post]);

  const handleCommentSubmit = async () => {
    if (!comment) {
      setCommentError("Please type a comment");
      return;
    }

    try {
      const { data: currentPost, error } = await supabase
        .from("posts")
        .select("comments")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setCommentError(error.message);
        setComment("");
        return;
      }

      if (currentPost) {
        // Appending the new comment to the existing comments array
        const updatedComments = [...(currentPost.comments || []), comment];

        // Updating the post with the updated comments
        const { data, error: updateError } = await supabase
          .from("posts")
          .update({ comments: updatedComments })
          .eq("id", id)
          .select();

        if (updateError) {
          console.error(updateError);
          setCommentError(updateError.message);
        } else if (data) {
          setCommentError(null);
          setComment("");
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setCommentError("Error adding comment");
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      setFormError(error.message);

      return;
    }

    router.push("/");
  };

  return (
    <div className="py-7">
      {post && (
        <div className="">
          <div className="">
            <div className="">
              {/* <Link href={"/"} className=" text-secondary underline">
                Home
              </Link> */}
              <h2 className="text-5xl font-semibold text-primary mb-10 underline capitalize ">
                {post.title}
              </h2>
            </div>

            <div className="flex gap-2 justify-end">
              <Link href={`/edit-post/${id}`} className="text-green-400">
                <BsPencil size={20} color="#061161" />
              </Link>
              <button onClick={handleDelete} className="text-red-400">
                <BsTrash size={20} color="#780206" />
              </button>
            </div>
          </div>

          <div className="min-h-[55vh] mt-6">
            <div className="w-full h-80 md:h-96 lg:h-[450px] relative ">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover absolute rounded-lg"
              />
            </div>

            <div className="p-3">
              {editorData && <PreviewRenderer data={editorData} />}
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-4">
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-800 outline-none rounded-md flex-1 max-w-[250px] py-1 px-2"
            />
            <button
              type="submit"
              onClick={handleCommentSubmit}
              className="rounded-md border-none bg-gray-700 text-offwhite px-2 py-1"
            >
              Add Comment
            </button>

            {commentError && (
              <p className="text-red-700 text-xs">{commentError}</p>
            )}
          </div>

          {post.comments && (
            <div className="my-3">
              {post.comments.map((c, index) => (
                <p key={index} className="first-letter:capitalize">
                  {c}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {formError && <p>{formError}</p>}
    </div>
  );
};

export default BlogPost;
