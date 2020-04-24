import {
    ValidationError,
} from 'yup';

interface Errors {
    [key: string]: string;
}

function getValidationErrors(error: ValidationError): Errors {
    const validationErrors: Errors = {};

    error.inner.forEach(error => {
        validationErrors[error.path] = error.message;
    });

    return validationErrors;
}

export default getValidationErrors;
