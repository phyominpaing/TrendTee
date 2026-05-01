import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

// const products = [
//   {
//     id: 1,
//     name: "Black T-shirt",
//     price: 200,
//     category: "T-shirts",
//     size: ["S", "M", "L", "XL"],
//     colors: ["Red", "Black"],
//     rating: 4,
//     images: [
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Black Hoodie",
//     price: 300,
//     category: "Hoodies",
//     size: ["S", "M", "L", "XL"],
//     colors: ["Red", "Black"],
//     rating: 5,
//     images: [
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Taiwan Jeans",
//     price: 200,
//     category: "Jeans",
//     size: ["S", "M", "L", "XL"],
//     colors: ["Red", "Black"],
//     rating: 3,
//     images: [
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Shorts",
//     price: 100,
//     category: "Shorts",
//     size: ["S", "M", "L", "XL"],
//     colors: ["Red", "Black"],
//     rating: 4,
//     images: [
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "Black Shirt",
//     price: 150,
//     category: "Shirt",
//     size: ["S", "M", "L", "XL"],
//     colors: ["Red", "Black"],
//     rating: 5,
//     images: [
//       {
//         url: "https://iili.io/FCGxQTv.png",
//       },
//       {
//         url: "https://iili.io/FCGxQTv.png0",
//       },
//     ],
//   },
// ];

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <main className="grid grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          name={product.name}
          image={product.images[0].url}
          ratingCount={product.rating}
          price={product.price}
        />
      ))}
    </main>
  );
};

export default ProductList;
