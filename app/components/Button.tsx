'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
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
        ${small ? 'border-[1px]' : 'border-2'}
      `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
            absolute
            left-4
            top-3
          "
                />
            )}
            {label}
        </button>
    );
}

export default Button;