import prisma from "@/app/libs/prismadb";

export default async function getListingsLocations() {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        locationValue: "BE",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
