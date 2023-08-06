import axios from "axios";

export type ApiResponse<T> = T

export type ErrorResponse = ApiResponse<{ error: { message: string, code: number } }>
export const handleError = (err: unknown): ErrorResponse => {
    if (axios.isAxiosError(err)) {
        const url = err.request.protocol + '//' + err.request.host + err.request.path;
        console.error('axios error', url, err.response?.status, err.response?.data);
        return {error: {message: 'A proxy request failed', code: err.response?.status || 500}}
    } else {
        return {error: {message: 'Internal Error', code: 500}}
    }
}
export const isError = (input: any): input is ErrorResponse => input?.error !== undefined && typeof input.error.code === "number" && typeof input.error.message === "string";
