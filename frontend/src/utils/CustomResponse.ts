export interface CustomResponse extends Response {
    success?: boolean;
    error?: boolean;
    message?: string;
    data?: any;
    token?: string;
}