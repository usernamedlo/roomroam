"use client";

import ky from "ky";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle, FcPhoneAndroid } from "react-icons/fc";
import { toast } from "react-hot-toast";

import useRegisterEmailModal from "@/app/hooks/useRegisterEmailModal";
import useRegisterPhoneModal from "@/app/hooks/useRegisterPhoneModal";
import useLoginEmailModal from "@/app/hooks/useLoginEmailModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import Span from "../Span";
import Input from "../inputs/Input";

const RegisterEmailModal = () => {

    const registerEmailModal = useRegisterEmailModal();
    const registerPhoneModal = useRegisterPhoneModal();
    const loginEmailModal = useLoginEmailModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        ky.post('/api/register', { json: data })
            .json()
            .then((data) => {
                toast.success('Registered!');
                registerEmailModal.onClose();
                loginEmailModal.onOpen();
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const onTogglePhoneModal = useCallback(() => {
        registerEmailModal.onClose();
        registerPhoneModal.onOpen();
    }, [registerEmailModal, registerPhoneModal]);

    const onToggleLoginModal = useCallback(() => {
        registerEmailModal.onClose();
        loginEmailModal.onOpen();
    }, [registerEmailModal, loginEmailModal]);

    const SOCIAL_BUTTONS = [
        { key: "facebook", label: "Continue with Facebook", src: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png", onClick: () => { alert("WIP") } },
        { key: "google", label: "Continue with Google", icon: FcGoogle, onClick: () => { signIn('google') } },
        { key: "github", label: "Continue with Github", icon: AiFillGithub, onClick: () => { signIn('github') } },
        { key: "phone", label: "Continue with phone", icon: FcPhoneAndroid, onClick: onTogglePhoneModal },
    ];

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Heading title="Welcome to Room Roam !" />
            <Input id="email" label="Email" inputType="email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" inputType="password" disabled={isLoading} register={register} errors={errors} required />
            <Span content="" />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-3 mt-3">
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
                        className="cursor-pointer hover:underline text-pyellow"> Log in</span>
                </p>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerEmailModal.isOpen}
            title="Login or Signup"
            actionLabel="Continue"
            onClose={registerEmailModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterEmailModal;
