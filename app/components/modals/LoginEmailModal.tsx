'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterEmailModal from "@/app/hooks/useRegisterEmailModal";
import useLoginEmailModal from "@/app/hooks/useLoginEmailModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import Span from "../Span";

const LoginModal = () => {
    const router = useRouter();
    const registerEmailModal = useRegisterEmailModal();
    const loginEmailModal = useLoginEmailModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> =
        (data) => {
            setIsLoading(true);
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    setIsLoading(false);

                    if (callback?.ok) {
                        toast.success('Logged in');
                        router.refresh();
                        loginEmailModal.onClose();
                    }

                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                });
        }

    const onToggle = useCallback(() => {
        loginEmailModal.onClose();
        registerEmailModal.onOpen();
    }, [loginEmailModal, registerEmailModal])

    const SOCIAL_BUTTONS = [
        { key: "facebook", label: "Continue with Facebook (Work in progress)", src: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png", onClick: () => { signIn('facebook') } },
        { key: "google", label: "Continue with Google", icon: FcGoogle, onClick: () => { signIn('google') } },
        { key: "github", label: "Continue with Github", icon: AiFillGithub, onClick: () => { signIn('github') } },
    ];


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!" />
            <hr />
            <Input id="email" label="Email" inputType="email" disabled={isLoading} register={register} errors={errors} required />
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
                <p>First time here ?
                    <span onClick={onToggle} className="cursor-pointer hover:underline text-pyellow">   Create an account</span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginEmailModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginEmailModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;