import { BiSearch } from "react-icons/bi";

const Search = () => {

    return (
        <div
            className="
            bg-white
            border
            mx-auto
            md:w-auto
            py-3
            px-4
            rounded-full
            shadow-md
            hover:shadow-lg
            transition
            cursor-pointer">
            <div className="text-base flex flex-row items-center font-medium">
                <div className="px-8 flex flex-col">
                    <span className="text-black">Location</span>
                    <span className="text-neutral-400 text-sm">Which city do you prefer?</span>
                </div>
                <div className="px-8 flex flex-col border-l border-r">
                    <span className="text-black">Check In</span>
                    <span className="text-neutral-400 text-sm">Add Dates</span>
                </div>
                <div className="px-8 flex flex-col border-r">
                    <span className="text-black">Check Out</span>
                    <span className="text-neutral-400 text-sm">Add Dates</span>
                </div>
                <div className="px-8 flex flex-col">
                    <span className="text-black">Guests</span>
                    <span className="text-neutral-400 text-sm">Add Guests</span>
                </div>
                <div className="p-5 bg-pyellow rounded-full text-white">
                    <BiSearch size={30} />
                </div>
            </div>
        </div>
    )
};

export default Search;
