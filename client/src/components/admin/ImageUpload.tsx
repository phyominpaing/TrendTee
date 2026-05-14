import { Button } from "@/components/ui/button";
import { fileToBase64 } from "@/lib/utils";
import { X } from "lucide-react";

interface ImageUploadProps {
  images: Array<{ preview: string; public_alt?: string }>;
  onChange: (
    images: Array<{ preview: string; file?: string; public_alt?: string }>,
  ) => void;
}
const ImageUpload = ({ images, onChange }: ImageUploadProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = await Promise.all(
      files.map(async (file) => ({
        file: await fileToBase64(file),
        preview: URL.createObjectURL(file),
        // public_alt: "",
      })),
    );

    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];

    if (images[index].preview.startsWith("blob:")) {
      URL.revokeObjectURL(newImages[index].preview);
    }

    newImages.splice(index, 1);
    onChange(newImages);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {images.map((img, index) => (
          <div key={index} className="relative group inline-block mr-2 mb-2">
            <img
              src={img.preview}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-slate-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => removeImage(index)}
            >
              {" "}
              <X className="size-4 text-white" />{" "}
            </button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        Add Images
      </Button>
      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
