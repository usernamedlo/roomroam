import React, { useState } from 'react';

import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

import Input from './Input';

interface Country {
    code: string;
    dialCode: string;
    name: string;
}

interface InputPhoneNumberProps {
    id: string;
    labelPhoneNumber: string;
    labelCountry: string;
    type?: string;
    pattern?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const COUNTRIES: Country[] = [
    { code: 'BE', dialCode: '+32', name: 'Belgique' },
    { code: 'FR', dialCode: '+33', name: 'France' },
    { code: 'LU', dialCode: '+352', name: 'Luxembourg' },
    { code: 'CH', dialCode: '+41', name: 'Suisse' },
    { code: 'GB', dialCode: '+44', name: 'Royaume-Uni' },
    { code: 'US', dialCode: '+1', name: 'États-Unis' },
    { code: 'CA', dialCode: '+1', name: 'Canada' },
    { code: 'AF', dialCode: '+93', name: 'Afghanistan' },
    { code: 'ZA', dialCode: '+27', name: 'Afrique du Sud' },
    { code: 'AL', dialCode: '+355', name: 'Albanie' },
];

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
    id,
    labelPhoneNumber: label,
    labelCountry,
    type = "tel",
    pattern = "^[0-9]{10}$",
    disabled,
    formatPrice,
    register,
    required,
    errors,
}) => {
    const [selectedDialCode, setSelectedDialCode] = useState<string>(COUNTRIES[0].dialCode);

    return (
        <div className="flex flex-col border-2 rounded-md">


            <select
                className="peer w-full font-medium bg-white rounded-md outline-none transition p-4 pt-6"
                onChange={(e) => setSelectedDialCode(COUNTRIES.find(country => country.code === e.target.value)?.dialCode || '')}>
                {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name} ({country.dialCode})
                    </option>
                ))}
            </select>
            <label
                className={`
                absolute
                font-light
                    text-sm
                    ml-4
                    mt-1
                    peer-focus:text-pyellow`}>
                {labelCountry}
            </label>

            <hr className="border-neutral-300" />

            <div className="flex">
                <span className="
                        flex 
                        items-center 
                        px-3">
                    {selectedDialCode}</span>

                <Input
                    id={id}
                    label={label}
                    phoneNumber={true}
                    type={type}
                    pattern={pattern}
                    disabled={disabled}
                    formatPrice={formatPrice}
                    register={register}
                    required={required}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default InputPhoneNumber;

