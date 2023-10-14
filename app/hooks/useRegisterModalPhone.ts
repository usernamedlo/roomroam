import { create } from "zustand";

interface RegisterPhoneModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterPhoneModal = create<RegisterPhoneModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterPhoneModal;
