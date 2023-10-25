import ListingCard from "./ListingCard";
import { BiMapPin } from "react-icons/bi";


interface TopRatedListingsProps {
    listings: any[],
    currentUser: any
}

const TopRatedListings: React.FC<TopRatedListingsProps> = ({ listings, currentUser }) => {
    return (
        <div className="pt-24">
            <h1 className="text-4xl font-bold">Top Rated Listings</h1>
            <div className="h-1 w-20 bg-pyellow rounded-full mt-2 mb-5"></div>
            <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8">
            </div>
        </div>
    );
};

export default TopRatedListings;
