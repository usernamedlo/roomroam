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

import useRegisterEmailModal from "@/app/hooks/useRegisterModalEmail";
import useRegisterPhoneModal from "@/app/hooks/useRegisterModalPhone";


import Modal from "./Modal";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
import Heading from "../Heading";
import Button from "../Button";
import Span from "../Span";
import { toast } from "react-hot-toast/headless";

const RegisterModalPhone = () => {

    const RegisterModalPhone = useRegisterPhoneModal();
    const RegisterModalEmail = useRegisterEmailModal();
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
        setIsLoading(true);

        try {
            await ky.post('/api/register', { json: data }).json();

            toast.success('Registered!');
            RegisterModalPhone.onClose();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    const onToggle = useCallback(() => {
        RegisterModalPhone.onClose();
        RegisterModalEmail.onOpen();
    }, [RegisterModalPhone, RegisterModalEmail]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Room Roam !"
            />
            <InputPhoneNumber id="phone" labelPhoneNumber="Phone Number" labelCountry="Country / Region" register={register} errors={errors} autoFocus={true} />
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
                src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png"
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
                        onClick={RegisterModalPhone.onClose}
                        className="cursor-pointer hover:underline text-pyellow"
                    > Log in</span>
                </p>
            </div>
        </div>
    )


    return (
        <Modal
            disable={isLoading}
            isOpen={RegisterModalPhone.isOpen}
            title="Login or Signup"
            actionLabel="Continue"
            onClose={RegisterModalPhone.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterModalPhone;
