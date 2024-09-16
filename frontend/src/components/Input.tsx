import React from "react";

interface InputProps {
    children: React.ReactNode;
    id?: string;
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    required?: boolean;
}

function Input({
                   children,
                   id,
                   type,
                   name,
                   value,
                   placeholder,
                   onChange,
                   onBlur,
               }: InputProps): React.JSX.Element {

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }

    const handleOnBlur = () => {
        if (onBlur) {
            onBlur();
        }
    }

    return (
        <>
            <label htmlFor={name}>{children}</label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
        </>
    );
}

export default Input;