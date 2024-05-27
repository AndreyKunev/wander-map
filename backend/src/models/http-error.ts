import { IHttpError } from "../types/types";

export class HttpError extends Error implements IHttpError {
    constructor(public message: string, public code: number) {
        super(message);

        Object.setPrototypeOf(this, HttpError.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}