"use client";

import Logo from "../navbar/Logo";

import { IoLogoGooglePlaystore, IoLogoAppleAppstore } from "react-icons/io5";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";

const FooterBox = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col">
            <Logo />
            <div className="text-gray-600">
              Room Roam is a website for finding hotel rooms.
            </div>
            <div className="flex justify-around items-center gap-5">
              <button className="inline-flex items-center bg-gray-300 hover:bg-gray-200 transition-transform duration-100 py-2 px-10 rounded-md mt-4">
                <IoLogoGooglePlaystore className="mr-2" /> Play Store
              </button>
              <button className="inline-flex items-center bg-gray-300 hover:bg-gray-200 transition-transform duration-100 py-2 px-10 rounded-md mt-4">
                <IoLogoAppleAppstore className="mr-2" /> App Store
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-10">
            <div className="text-xl font-bold mb-4">ROOM ROAM</div>
            <div className="text-gray-600">About Us</div>
            <div className="text-gray-600">Legal Information</div>
            <div className="text-gray-600">Contact Us</div>
            <div className="text-gray-600">Blogs</div>
          </div>
          <div className="flex flex-col ml-10">
            <div className="text-xl font-bold mb-4">HELP CENTER</div>
            <div className="text-gray-600">Find a Property</div>
            <div className="text-gray-600">How To Host ?</div>
            <div className="text-gray-600">Why Us ?</div>
            <div className="text-gray-600">FAQs</div>
            <div className="text-gray-600">Rental Guides</div>
          </div>
          <div className="flex flex-col ml-10">
            <div className="text-xl font-bold mb-4">CONTACT INFO</div>
            <div className="text-gray-600">Phone: 1234567890</div>
            <div className="text-gray-600">Email: room.roam@roomroam.com</div>
            <div className="text-gray-600">Address: 123, ABC Street</div>
            <div className="flex justify-around items-center gap-5 mt-4">
                <AiFillFacebook size={30} color="gray" />
                <AiOutlineTwitter size={30} color="gray" />
                <AiOutlineInstagram size={30} color="gray" />
                <AiFillLinkedin size={30} color="gray" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-center mt-10">
        © 2023  Room Roam, Inc.
      </div>
    </div>
  );
};

export default FooterBox;
