export declare const uploadSingleImage: (image: string, folder_name: string) => Promise<{
    image_url: string;
    public_alt: string;
}>;
export declare const deleteImage: (public_alt: string) => Promise<boolean>;
//# sourceMappingURL=cloudinary.d.ts.map