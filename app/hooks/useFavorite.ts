import ky from "ky";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginEmailModal from "./useLoginEmailModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginEmailModal = useLoginEmailModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoritesIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginEmailModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => ky.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => ky.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success!");
      } catch (error) {
        toast.error("Error!");
      }
    },
    [currentUser, hasFavorited, listingId, loginEmailModal, router]
  );

  return {
    toggleFavorite,
    hasFavorited,
  };
};

export default useFavorite;
