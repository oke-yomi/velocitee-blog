import { Post } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

type Props = {
  fetchError: string | null;
  posts: Post[] | null;
  updateLike: (index: number) => void;
  likes: any[];
  grid: boolean;
};

const BlogPosts = ({ fetchError, posts, updateLike, likes, grid }: Props) => {
  return (
    <div className="mt-10">
      {fetchError && (
        <p className="text-red-600 font-medium text-2xl">{fetchError}</p>
      )}

      {(!posts || posts.length < 1) && (
        <div className="flex justify-center items-center h-[40vh]">
          <p className="text-xl font-medium text-gray-700">Posts not found</p>
        </div>
      )}

      {posts && (
        <>
          {grid ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {posts.map((post, index) => (
                <Link
                  href={`/blog/${post.id}-${post.slug}`}
                  key={post.id}
                  className="rounded-lg border hover:scale-95 transition-all ease-in-out duration-500"
                >
                  <div className="w-full h-80 relative ">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover absolute rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-medium capitalize text-2xl text-primary">
                      {post.title}
                    </h2>
                    <div className="flex justify-between items-center mt-5">
                      <Link
                        href={`/blog/${post.id}-${post.slug}`}
                        className="block underline hover:text-primary text-secondary"
                      >
                        View Post {">"}
                      </Link>

                      <button onClick={() => updateLike(index)}>
                        {likes[index] ? (
                          <BsHeartFill color="#780206" />
                        ) : (
                          <BsHeart color="gray" />
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <ul>
              {posts.map((post, index) => (
                <Link
                  href={`/blog/${post.id}-${post.slug}`}
                  key={post.id}
                  className="rounded-lg border hover:scale-95 transition-all ease-in-out duration-500 flex mb-3 h-20"
                >
                  <div className="w-20 h-20 relative ">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover absolute rounded-l-lg"
                    />
                  </div>

                  <div className="px-2 py-3 flex-1">
                    <h2 className="font-medium capitalize text-xl text-primary">
                      {post.title}
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                      <Link
                        href={`/blog/${post.id}-${post.slug}`}
                        className="block underline hover:text-primary text-secondary"
                      >
                        View Post {">"}
                      </Link>

                      <button onClick={() => updateLike(index)}>
                        {likes[index] ? (
                          <BsHeartFill color="#780206" />
                        ) : (
                          <BsHeart color="gray" />
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPosts;
