import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="py-4 border-b">
      <div className="flex justify-between items-center">
        <h3 className="text-secondary font-medium text-2xl">
          Velo<span className="text-primary">citee</span>
        </h3>

        <Link
          href={"/create-post"}
          className="border-none rounded-md px-4 py-2 bg-secondary text-offwhite text-sm"
        >
          Create New Post
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
