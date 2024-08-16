import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav>
        <div className=" flex justify-between lg:px-14 lg:py-4 px-4 py-2 fixed left-0 top-0 right-0 bg-slate-300 ">
          <ul>
            <li className=" lg:text-3xl text-2xl font-semibold cursor-pointer">MyArticle.</li>
          </ul>
          <ul>
            <Link href={"/form"}>
              <button className="lg:px-6 lg:py-3 px-4 py-2 font-semibold  rounded-md bg-blue-500 text-white hover:bg-blue-600">
                Create Article
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar