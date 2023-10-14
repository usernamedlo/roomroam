import { create } from "zustand";

interface RegisterEmailModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterEmailModal = create<RegisterEmailModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterEmailModal;
