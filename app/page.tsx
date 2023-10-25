import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import LatestListings from "./components/listings/LatestListings";
import NearbyListings from "./components/listings/NearbyListings";
import TopRatedListings from "./components/listings/TopRatedListings";

import getListings from "./actions/getListings";
import getListingsLocations from "./actions/getListingsLocations";
import getCurrentUser from "./actions/getCurrentUser";
import Banner from "./components/Banner";

export default async function Home() {

  const listings = await getListings();
  const listingsLocations = await getListingsLocations();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Banner />
      <Container>
        <LatestListings listings={listings} currentUser={currentUser} />
        <NearbyListings listings={listingsLocations} currentUser={currentUser} />
        <TopRatedListings listings={listings} currentUser={currentUser} />
      </Container>
    </ClientOnly>
  )
}
