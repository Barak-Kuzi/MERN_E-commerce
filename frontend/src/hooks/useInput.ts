import {useState} from "react";

interface InputProps {
    initialValue: string;
    validationFunction?: (value: string) => string;
}

function useInput({initialValue, validationFunction}: InputProps) {
    const [enteredValue, setEnteredValue] = useState<string>(initialValue);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const valueIsValid = validationFunction ? validationFunction(enteredValue) === "" : true;

    const handleError = (value: string) => {
        if (validationFunction) {
            const errMsg = validationFunction(value);
            if (errMsg !== "") {
                setErrorMessage(errMsg);
            }
        }
    }

    const handleInputChange = (value: string) => {
        setEnteredValue(value);
        setIsEdited(false);
        handleError(value);
    };

    const handleInputBlur = () => {
        setIsEdited(true);
        handleError(enteredValue);
    };

    return {
        enteredValue,
        isEdited,
        valueIsValid,
        errorMessage,
        handleInputChange,
        handleInputBlur
    }
}

export default useInput;