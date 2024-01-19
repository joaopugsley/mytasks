import { AxiosError } from "axios";

export type NestValidationError = {
    data: {
        message: string[] | string;
    }
}

export const extractNestErrorMessage = (e: AxiosError, message?: string): string => {
    if(e.response && e.response.data) {
        const error = e.response as NestValidationError;
        if (Array.isArray(error.data.message)) {
            return error.data.message[0];
        }
        return error.data.message;
    }
    return message || 'An internal error occurred, try again later.';
}