"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";

import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterEmailModal from "@/app/hooks/useRegisterEmailModal";
import useLoginEmailModal from "@/app/hooks/useLoginEmailModal";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerEmailModal = useRegisterEmailModal();
    const loginEmailModal = useLoginEmailModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const handleClickOutside = useCallback((event: Event) => {
        if (toggleButtonRef.current && toggleButtonRef.current.contains(event.target as Node)) {
            return;
        }

        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const toggleButtonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);


    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-2">
                <div
                    onClick={() => { }}
                    className="hidden lg:block text-md font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Become a host
                </div>
                <div
                    ref={toggleButtonRef}
                    onClick={toggleOpen}
                    className="p-5 lg:py-2 lg:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-4 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden lg:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute rounded-xl border shadow-lg w-[50vw] md:w-[30vw] lg:w-2/3 bg-white overflow-hidden lg:right-1 top-16 lg:top-14">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <div className="font-semibold my-2">
                                    <MenuItem onClick={() => { }} label="Message" />
                                    <MenuItem onClick={() => { }} label="Notifications" />
                                    <MenuItem onClick={() => { }} label="Reservations" />
                                    <MenuItem onClick={() => { }} label="Wishlists" />
                                </div>
                                <hr className="border-neutral-200" />
                                <div className="font-medium my-2">
                                    <MenuItem onClick={() => { }} label="Account" />
                                    <MenuItem onClick={() => { }} label="Help Center" />
                                    <MenuItem onClick={() => {
                                        signOut()
                                        toast.success("Logged out successfully.")
                                    }} label="Log out" />
                                </div>
                            </>) : (
                            <>
                                <div className="font-semibold my-2">
                                    <MenuItem onClick={registerEmailModal.onOpen} label="Sign up" />
                                    <MenuItem onClick={loginEmailModal.onOpen} label="Login" />
                                </div>
                                <hr className="border-neutral-200" />
                                <div className="font-medium my-2">
                                    <MenuItem onClick={() => { }} label="Help Center" />
                                </div>
                            </>)}
                    </div>
                </div>
            )}
        </div >
    )
};

export default UserMenu;
