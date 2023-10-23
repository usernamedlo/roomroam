import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import LatestListings from "./components/listings/LatestListings";
import NearbyListings from "./components/listings/NearbyListings";

import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {

  const listings = await getListings();
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
      <Container>
        <LatestListings listings={listings} currentUser={currentUser} />
        <NearbyListings listings={listings} currentUser={currentUser} />
      </Container>
    </ClientOnly>
  )
}
