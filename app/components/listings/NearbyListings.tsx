import ListingCard from "./ListingCard";
import { BiMapPin } from "react-icons/bi";


interface NearbyListingsProps {
    listings: any[],
    currentUser: any
}

const NearbyListings: React.FC<NearbyListingsProps> = ({ listings, currentUser }) => {
    return (
        <div className="pt-24">
            <h1 className="text-4xl font-bold">Nearby Listings</h1>
            <div className="flex flex-row justify-between">
                <div className="h-1 w-20 bg-pyellow rounded-full mt-2 mb-5"></div>
                <p className="flex font-medium items-center gap-1"><BiMapPin size={17}/>Show on map</p>
            </div>
            <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8">
                {listings.map((listing) => {
                    return (
                        <ListingCard currentUser={currentUser} key={listing.key} data={listing} />
                    )
                })}
            </div>
        </div>
    );
};

export default NearbyListings;
