import React from "react";

// import styles from "../styles/Input.module.css";

interface InputProps {
    children: React.ReactNode;
    id?: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    required?: boolean;
    readOnly?: boolean;
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
                   readOnly
               }: InputProps): React.JSX.Element {

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange)
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
                readOnly={readOnly}
            />
        </>
    );
}

export default Input;