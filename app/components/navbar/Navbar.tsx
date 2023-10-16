"use client";

import React from "react";
import Container from "../Container";
import { User } from "@prisma/client";

import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import UserMenu from "./UserMenu";

interface NavbarProps {
    currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
    currentUser 
}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between md:gap-0">
                        <Logo />
                        <NavigationMenu />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;