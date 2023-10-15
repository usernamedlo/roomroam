'use client';

import {useRef, useEffect} from "react";


import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    inputType?: 'default' | 'price' | 'phoneNumber';
    pattern?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    phoneNumber?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    autoFocus?: boolean,
}



const Input: React.FC<InputProps> = ({
    id,
    label,
    inputType = 'default',
    pattern,
    disabled,
    formatPrice,
    phoneNumber,
    register,
    required,
    errors,
    autoFocus,
}) => {

    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    return (
        <div className="w-full relative">
            {formatPrice && (<BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />)}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={inputType === 'phoneNumber' ? 'tel' : 'text'}
                pattern={pattern}
                autoFocus={autoFocus}
                ref={inputRef}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6 
                    font-medium
                    bg-white 
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    text-black
                    disabled:cursor-not-allowed
                    ${inputType === 'price' ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-pyellow' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-pyellow' : 'focus:border-black'}
                    ${inputType === 'phoneNumber' ? 'border-none' : ''}
                    `} />
            <label
                htmlFor={id}
                className={`
                    absolute 
                    text-md
                    transform 
                    -translate-y-3 
                    top-[1.30rem] 
                    z-10 
                    origin-[0] 
                    ${inputType === 'price' ? 'left-9' : 'left-4'}
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    peer-focus:text-pyellow
                    peer-[:not(:placeholder-shown)]:-translate-y-4
                    peer-[:not(:placeholder-shown)]:scale-75
                    peer-[:not(:placeholder-shown)]:text-pyellow
                    ${errors[id] ? 'text-pyellow' : 'text-zinc-400'}`}>
                {label}
            </label>
        </div>
    );
}

export default Input;