import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-slate-300 fixed left-0 top-0 right-0 z-10">
        <div className="flex justify-between items-center px-6 py-3 lg:px-10 lg:py-4">
          <ul>
            <li className="text-xl lg:text-3xl font-semibold cursor-pointer">
              MyArticle.
            </li>
          </ul>
          <ul className="hidden md:flex">
            <Link href={"/"}>
              <button className="px-4 py-2 lg:px-6 lg:py-3 font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600">
                Home
              </button>
            </Link>
          </ul>
          <ul className="md:hidden px-10">
            <Link href={"/"}>
              <button className="px-4 py-1 font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600">
                Home
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
