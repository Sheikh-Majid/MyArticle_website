import React from 'react'

const Footer = () => {
  return (
    <div className=" w-full h-[100px] flex flex-col justify-center items-center text-gray-950 bg-slate-300">
      <p className=" cursor-pointer font-semibold">
        ©2024 My Article. All rights reserved.
      </p>
      <p className=" cursor-pointer font-semibold hover:text-gray-700">Made by Sheikh Majid</p>
    </div>
  );
}

export default Footer