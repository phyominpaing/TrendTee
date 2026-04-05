import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingConverter from "../common/RatingConverter";
import { Minus, Plus } from "lucide-react";

const product = {
  id: 1,
  name: "Black T-shirt",
  price: 200,
  category: "T-shirts",
  size: ["Small", "Medium", "Large", "Extra Large"],
  colors: ["#0744ed", "#000000", "#f20fcc", "#ff0000"],
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, eos sapiente suscipit eveniet mollitia enim expedita aperiam minus, delectus numquam ipsum eum saepe, harum error excepturi assumenda voluptas? Quod, labore!",
  rating: 4,
  images: [
    {
      url: "https://iili.io/FCGxQTv.png",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuJlDXI-obS8pk_O1nntSAtrZhIsNel82mbQ&s",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnMGiP0-W1znSNgJuvw7Sj2V2ks5i2Bq80Ow&s",
    },
    {
      url: "https://sporcks.com/cdn/shop/files/azul1_13cdfbff-09ad-47dc-a460-05a534c5573d.jpg?v=1717067226&width=2048",
    },
  ],
};

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    if (product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }

    if (product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }

    if (product.size.length > 0) {
      setSelectedSize(product.size[0]);
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

  return (
    <section className="grid grid-cols-2 gap-8 mt-6">
      <div className="grid grid-cols-4">
        <div className="col-span-1 flex flex-col items-center justify-center gap-4">
          {product.images.map((image, index) => (
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
          {product.colors.map((color, index) => (
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
          {product.size.map((size, index) => (
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
            <button className="bg-black p-2 rounded-md text-white cursor-pointer">
              <Minus size={18} />
            </button>
            <span className="font-medium">1</span>
            <button className="bg-black p-2 rounded-md text-white cursor-pointer">
              <Plus size={18} />
            </button>
          </div>
          <button className="bg-black p-2 rounded-md text-white w-full text-center text-sm cursor-pointer">Add to Cart</button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
