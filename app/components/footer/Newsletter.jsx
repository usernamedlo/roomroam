"use client";

import { AiOutlineSend } from "react-icons/ai";

const Newsletter = () => {
  return (
    <div className="h-32 bg-gray-200">
      <div className="flex items-center justify-center mx-auto gap-20 p-10">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">NEWSLETTER</h3>
          <p className="">Stay Upto Date</p>
        </div>
        <div className="relative">
          <input
            className="w-[49rem] rounded-full px-4 py-4"
            placeholder="Your Email..."
          />
          <button className="absolute inset-y-0 right-0 bg-gray-400 hover:bg-gray-300 transition-transform duration-100 py-2 px-4 rounded-full">
            <AiOutlineSend size={25} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
