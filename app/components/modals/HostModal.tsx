"use client";

import { useMemo, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";

import useHostModal from "@/app/hooks/useHostModal";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import { categories } from "@/app/components/navbar/SearchMenu";
import CategoryInput from "../inputs/CategoryInput";
import Heading from "../Heading";
import Modal from "./Modal";

import dynamic from "next/dynamic";


enum STEPS {
    CATERGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const BookModal = () => {

    const hostModal = useHostModal();

    const [step, setStep] = useState(STEPS.CATERGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });

    const category = watch('category');
    const location = watch('location');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }

        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATERGORY) {
            return undefined;
        }

        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-4 my-3">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div
                className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
            >
                {categories.map((item) => (
                    <div key={item.key} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How many guests can your place accommodate?"
                    subtitle="Guests won't see this"
                />
                <div className="flex flex-col gap-4">
                    <label htmlFor="guestCount">Guests</label>
                    <input
                        id="guestCount"
                        type="number"
                        {...register('guestCount', {
                            required: true,
                            min: 1,
                        })}
                    />
                    {errors.guestCount && (
                        <span className="text-red-500">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="roomCount">Rooms</label>
                    <input
                        id="roomCount"
                        type="number"
                        {...register('roomCount', {
                            required: true,
                            min: 1,
                        })}
                    />
                    {errors.roomCount && (
                        <span className="text-red-500">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="bathroomCount">Bathrooms</label>
                    <input
                        id="bathroomCount"
                        type="number"
                        {...register('bathroomCount', {
                            required: true,
                            min: 1,
                        })}
                    />
                    {errors.bathroomCount && (
                        <span className="text-red-500">
                            This field is required
                        </span>
                    )}
                </div>
            </div>
        );
    }


    return (
        <Modal
            isOpen={hostModal.isOpen}
            onClose={hostModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATERGORY ? undefined : onBack}
            title="Host your home"
            body={bodyContent}
        />
    )
};

export default BookModal;
