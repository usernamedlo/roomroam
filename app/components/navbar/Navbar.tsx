"use client";

import React from "react";
import Container from "../Container";
import Banner from "./Banner";

import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
    currentUser 
}) => {
    return (
        <div className="fixed w-full top-0 bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[2px]">
                <Container>
                    <div className="flex flex-row items-center justify-between md:gap-0">
                        <Logo />
                        <NavigationMenu />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Banner />
        </div>
    );
}

export default Navbar;