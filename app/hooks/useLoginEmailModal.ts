import { create } from "zustand";

interface LoginEmailModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginEmailModal = create<LoginEmailModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginEmailModal;
