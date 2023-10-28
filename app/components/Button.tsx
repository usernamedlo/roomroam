'use client';

import { IconType } from "react-icons";
import NextImage from "next/image";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    src?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    src: Image,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        transform
        scale-100
        active:scale-95
        transition-transform
        duration-100
        w-full
        ${outline ? 'bg-white' : 'bg-pyellow'}
        ${outline ? 'hover:bg-neutral-100' : 'hover:bg-pyellowHover'}
        ${outline ? 'border-black' : 'border-pyellow'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}`}>
        {Image && (<NextImage src={Image} width={24} height={24} alt="icon" className="absolute left-4 top-3 w-6" />)}
        {Icon && (<Icon size={24} className="absolute left-4 top-3" />)}
        {label}
        </button>
    );
}

export default Button;