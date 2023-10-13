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
    disable?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disable,
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
        if (disable) return;

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disable, onClose]);


    const handleSubmit = useCallback(() => {
        if (disable) return;

        onSubmit();
    }, [disable, onSubmit]);


    const handleSecondaryAction = useCallback(() => {
        if (disable || !secondaryAction) return;

        secondaryAction();
    }, [disable, secondaryAction]);

    if (!isOpen) return null;
    return (
        <>
            <div
                onClick={handleOutsideClick}
                className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
            >
                <div ref={modalRef} className="relative w-full md:w-4/6 lg:w-3/6 xl:w-1/3 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    {/* CONTENT */}
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* HEADER */}
                            <div className="flex items-center p-4 rounded-t justify-between relative">
                                <button className="hover:opacity-70 transition absolute right-4" onClick={handleClose}>
                                    <IoMdClose size={30} />
                                </button>
                                <h3 className="text-lg font-bold text-pblack">{title}</h3>
                            </div>
                            <hr className="w-[95%] mx-auto" />
                            {/* BODY */}
                            <div className="relative px-6 pt-6 flex-auto">
                                {body}
                            </div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 px-6 pb-6">
                                <div className="flew flex-row items-center gap-4 w-full">
                                    {secondaryAction && (secondaryActionLabel && (<Button outline disabled={disable} label={secondaryActionLabel} onClick={handleSecondaryAction} />))}
                                    <Button disabled={disable} label={actionLabel} onClick={handleSubmit} />
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
