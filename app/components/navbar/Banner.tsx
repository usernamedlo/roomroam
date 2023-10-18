"use client";

import Search from "./Search";
import SearchMenu from "./SearchMenu";

const Banner = () => {


    return (
        <div className="hidden bg-[#b9babb] h-[41rem] w-full lg:flex flex-col justify-end">
            <div className="mx-auto my-20">
                <div className="flex flex-row justify-start mx-6 my-4 gap-5 items-center">
                    <h3 className=" text-pyellow text-5xl font-semibold">Find</h3>
                    <SearchMenu />
                </div>
                <Search />
            </div>
        </div>
    )
};

export default Banner;
