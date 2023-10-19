"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    footer,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {

    const [showModal, setShowModal] = useState(isOpen);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleClose();
        }
    };

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <>
            <div
                onClick={handleOutsideClick}
                className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
            >
                <div ref={modalRef} className="relative w-full md:w-4/6 lg:w-3/6 xl:w-1/3 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    <div className={`transition-transform duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center p-4 rounded-t justify-between relative">
                                <button className="hover:opacity-70 transition absolute right-4" onClick={handleClose}>
                                    <IoMdClose size={30} />
                                </button>
                                <h3 className="text-lg font-bold text-pblack">{title}</h3>
                            </div>
                            <hr className="w-[95%] mx-auto" />
                            <div className="relative px-6 pt-6 flex-auto">
                                {body}
                            </div>
                            <div className={`${secondaryActionLabel ? 'p-6' : 'px-6 pb-6'} flex flex-col gap-2`}>
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                            outline
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Modal;
