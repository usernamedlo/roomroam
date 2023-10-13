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

import useRegisterModal from "../../hooks/useRegisterModal";


import Modal from "./Modal";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
import Heading from "../Heading";
import Button from "../Button";
import Span from "../Span";
import toast from "react-hot-toast/headless";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
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
            registerModal.onClose();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Room Roam !"
            />
            <InputPhoneNumber id="phone" labelPhoneNumber="Phone Number" labelCountry="Country / Region" register={register} errors={errors} />
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
                onClick={() => { }}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>Already have an account?
                    <span
                        onClick={registerModal.onClose}
                        className="text-neutral-800 cursor-pointer hover:underline text-pyellow"
                    > Log in</span>
                </p>
            </div>
        </div>
    )


    return (
        <Modal
            disable={isLoading}
            isOpen={registerModal.isOpen}
            title="Login or Signup"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterModal;
