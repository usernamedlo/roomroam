import { create } from "zustand";

interface HostModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useHostModal = create<HostModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useHostModal;
