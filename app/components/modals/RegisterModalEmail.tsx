"use client";

import ky from "ky";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterEmailModal from "@/app/hooks/useRegisterModalEmail";
import useRegisterPhoneModal from "@/app/hooks/useRegisterModalPhone";

import Modal from "./Modal";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
import Heading from "../Heading";
import Button from "../Button";
import Span from "../Span";
import {toast} from "react-hot-toast/headless";
import Input from "../inputs/Input";

const RegisterModalEmail = () => {

    const registerEmailModal = useRegisterEmailModal();
    const registerPhoneModal = useRegisterPhoneModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            await ky.post('/api/register', { json: data }).json();

            toast.success('Registered!');
            registerEmailModal.onClose();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    const onToggle = useCallback(() => {
        registerEmailModal.onClose();
        registerPhoneModal.onOpen();
    }, [registerEmailModal, registerPhoneModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Room Roam !"
            />
            <Input id="email" label="Email" type="email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
            <Span content=""/>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <div className="flex flex-row items-center">
                <hr className="flex-grow border-neutral-300" />
                <p className="text-center mx-4">or</p>
                <hr className="flex-grow border-neutral-300" />
            </div>
            <Button
                outline
                label="Continue with Facebook"
                icon={FaFacebookSquare}
                onClick={() => { }}
            />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => { }}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => { }}
            />
            <Button
                outline
                label="Continue with email"
                icon={AiOutlineMail}
                onClick={onToggle}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>Already have an account?
                    <span
                        onClick={registerEmailModal.onClose}
                        className="cursor-pointer hover:underline text-pyellow"
                    > Log in</span>
                </p>
            </div>
        </div>
    )


    return (
        <Modal
            disable={isLoading}
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

export default RegisterModalEmail;
