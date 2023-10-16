"use client";

import ky from "ky";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { signIn } from 'next-auth/react';

import useRegisterEmailModal from "@/app/hooks/useRegisterEmailModal";
import useRegisterPhoneModal from "@/app/hooks/useRegisterPhoneModal";
import useLoginEmailModal from "@/app/hooks/useLoginEmailModal";


import Modal from "./Modal";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
import Heading from "../Heading";
import Button from "../Button";
import Span from "../Span";
import { toast } from "react-hot-toast/headless";

const RegisterPhoneModal = () => {

    const registerPhoneModal = useRegisterPhoneModal();
    const registerEmailModal = useRegisterEmailModal();
    const LoginModal = useLoginEmailModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            phone: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        toast.error("Not implemented yet!");

        // setIsLoading(true);

        // try {
        //     await ky.post('/api/register', { json: data }).json();

        //     toast.success('Registered!');
        //     RegisterModalPhone.onClose();
        // } catch (error) {
        //     toast.error("Something went wrong!");
        // } finally {
        //     setIsLoading(false);
        // }
    }

    const onToggleEmailModal = useCallback(() => {
        registerPhoneModal.onClose();
        registerEmailModal.onOpen();
    }, [registerPhoneModal, registerEmailModal]);

    const onToggleLoginModal = useCallback(() => {
        registerPhoneModal.onClose();
        LoginModal.onOpen();
    }, [registerPhoneModal, LoginModal]);

    const SOCIAL_BUTTONS = [
        { key: "facebook", label: "Continue with Facebook", src: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png", onClick: () => { signIn('facebook') } },
        { key: "google", label: "Continue with Google", icon: FcGoogle, onClick: () => { signIn('google') } },
        { key: "github", label: "Continue with Github", icon: AiFillGithub, onClick: () => { signIn('github') } },
        { key: "email" , label: "Continue with phone", icon: AiOutlineMail, onClick: onToggleEmailModal },
    ];

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Room Roam !"
            />
            <InputPhoneNumber id="phone" labelPhoneNumber="Phone Number" labelCountry="Country / Region" register={register} errors={errors} autoFocus={true} required />
            <Span content="We’ll call or text you to confirm your number. Standard message and data rates apply. " />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <div className="flex flex-row items-center">
                <hr className="flex-grow border-neutral-300" />
                <p className="text-center mx-4">or</p>
                <hr className="flex-grow border-neutral-300" />
            </div>
            {SOCIAL_BUTTONS.map(button => (
                <Button
                    key={button.key}
                    outline
                    label={button.label}
                    src={button.src}
                    icon={button.icon}
                    onClick={button.onClick}
                />
            ))}
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>Already have an account?
                    <span
                        onClick={onToggleLoginModal}
                        className="cursor-pointer hover:underline text-pyellow"
                    > Log in</span>
                </p>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerPhoneModal.isOpen}
            title="Login or Signup"
            actionLabel="Continue"
            onClose={registerPhoneModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterPhoneModal;
