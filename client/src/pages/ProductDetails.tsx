import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingConverter from "../common/RatingConverter";
import { Minus, Plus } from "lucide-react";
import { useGetProductDetailsQuery } from "@/store/slices/productApi";
import type { ProductImage } from "@/types/product";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>(); 
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();

  const { data: product, isLoading } = useGetProductDetailsQuery(id as string);

  useEffect(() => {
    if (product) {
      if (product.images.length > 0) setSelectedImage(product.images[0].url);

      if (product.colors.length > 0) setSelectedColor(product.colors[0]);

      if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="grid grid-cols-2 gap-8 mt-6">
      <div className="grid grid-cols-4">
        <div className="col-span-1 flex flex-col items-center justify-center gap-4">
          {product.images.map((image: ProductImage, index: number) => (
            <div
              key={index}
              className={`${selectedImage === image.url ? "border-2 border-gray-400 rounded-xl w-fit h-fit" : ""}`}
            >
              <img
                src={image.url}
                alt={image.url}
                className="w-24 h-24 cursor-pointer object-cover rounded-xl"
                onClick={() => handleImageClick(image.url)}
              />
            </div>
          ))}
        </div>
        <img
          className="col-span-3 h-full aspect-square object-cover rounded-xl"
          src={selectedImage}
          alt={selectedImage}
        />
      </div>

      <div className="flex flex-col justify-between">
        <h2 className="text-3xl font-medium mb-2">{product.name}</h2>
        <RatingConverter count={product.rating} />
        <p className="text-xl font-semibold my-4">${product.price}</p>
        <p className="text-sm font-medium text-gray-400">
          {product.description}
        </p>
        <hr className="mt-4 text-gray-300" />

        <h2 className="text-lg font-semibold my-2 text-slate-600">Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color: string, index: number) => (
            <div
              onClick={() => handleColorClick(color)}
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === color ? "border-2 border-gray-400" : ""}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <hr className="mt-4 text-gray-300" />

        <h2 className="text-lg font-semibold my-2 text-slate-600">Sizes</h2>
        <div className="flex items-center gap-2">
          {product.sizes.map((size: string, index: number) => (
            <div
              onClick={() => handleSizeClick(size)}
              key={index}
              className={` border border-gray-300 text-gray-600 text-sm rounded-md px-4 py-1 cursor-pointer ${selectedSize === size ? "bg-black text-white" : ""}`}
            >
              {size}
            </div>
          ))}
        </div>

        <hr className="mt-4 text-gray-300" />
        <div className="mt-4 flex items-center gap-8">
          <div className=" flex items-center gap-4">
            <button
              onClick={() =>
                setQuantity((prev) => {
                  if (prev === 1) {
                    return prev;
                  }
                  return prev - 1;
                })
              }
              className="bg-black p-2 rounded-md text-white cursor-pointer"
            >
              <Minus size={18} />
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="bg-black p-2 rounded-md text-white cursor-pointer"
            >
              <Plus size={18} />
            </button>
          </div>
          <button className="bg-black p-2 rounded-md text-white w-full text-center text-sm cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
