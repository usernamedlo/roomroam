"use client";

import SearchBar from "./navbar/SearchBar";
import SearchMenu from "./navbar/SearchMenu";

const Banner = () => {
    const images = [
        "/images/unDraw/undraw_best_place_re_lne9.svg",
        "/images/unDraw/undraw_travelers_re_y25a.svg",
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <div className="hidden bg-[#EFF0F2] h-[41rem] w-full lg:flex flex-col justify-end">
            <div className="mx-auto my-16">
                <img src={randomImage} alt="Random Illustration" className="w-[35rem] my-3 mx-auto" />
                <div className="flex flex-row justify-start mx-6 my-4 gap-5 items-start">
                    <h3 className=" text-pyellow text-5xl font-bold">Find</h3>
                    <SearchMenu />
                </div>
                <SearchBar />
            </div>
        </div>
    );
};

export default Banner;
