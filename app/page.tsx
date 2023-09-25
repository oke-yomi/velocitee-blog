"use client";

import { Post } from "@/utils/constants";
import supabase from "@/config/supabase";
import { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import BlogPosts from "@/components/BlogPosts";

export default function Home() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [orderBy, setOrderBy] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [likes, setLikes] = useState(Array(posts?.length).fill(false));
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .order("created_at", { ascending: orderBy });

      if (error) {
        setFetchError("Could not fetch the blog posts");
        setPosts(null);
        console.log(error);

        return;
      }

      if (data) {
        const filteredPosts =
          searchTerm.length >= 1
            ? data.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : data;

        setPosts(filteredPosts);
        setFetchError(null);
      }
    };

    fetchBlogPosts();
  }, [orderBy, searchTerm]);

  const updateLike = (index: number) => {
    const updatedLikes = [...likes];

    updatedLikes[index] = !updatedLikes[index];

    setLikes(updatedLikes);
  };

  return (
    <section className="py-4 pt-16">
      <div className="">
        <div className="flex justify-between items-end mb-10">
          <h4 className="font-semibold text-2xl">View All Posts</h4>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setGrid(true);
              }}
            >
              <BsFillGrid3X3GapFill
                size={24}
                color={grid ? "#061161" : "gray"}
              />
            </button>
            <button
              onClick={() => {
                setGrid(false);
              }}
            >
              <FaList size={24} color={grid ? "gray" : "#061161"} />
            </button>
          </div>
        </div>

        <div className="mb-5">
          <button
            onClick={() => setOrderBy(false)}
            className={`mr-4 ${
              orderBy ? "bg-gray-600" : "bg-primary"
            } px-4 py-2 rounded-md hover:translate-y-1 hover:scale-95 duration-200 transition-all ease-in-out text-offwhite text-sm`}
          >
            Most recent posts
          </button>
          <button
            onClick={() => setOrderBy(true)}
            className={`mr-2 ${
              orderBy ? "bg-primary" : "bg-gray-600"
            } px-4 py-2 rounded-md hover:translate-y-1 hover:scale-95 duration-200 transition-all ease-in-out text-offwhite text-sm`}
          >
            Oldest posts
          </button>
        </div>

        <div className="flex justify-end">
          <div className="border rounded-lg w-fit border-secondary px-2 py-1 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search posts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-7 w-60 outline-none"
            />
            <FcSearch size={24} />
          </div>
        </div>
      </div>

      <BlogPosts
        fetchError={fetchError}
        posts={posts}
        updateLike={updateLike}
        likes={likes}
        grid={grid}
      />
    </section>
  );
}
