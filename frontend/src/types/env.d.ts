export {};

declare global {
    interface Window {
        __ENV__: {
            BACKEND_URI: string;
            CLOUDINARY_CLOUD_NAME: string;
        };
    }
}