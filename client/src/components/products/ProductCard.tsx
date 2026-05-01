import { Link } from "react-router";
import RatingConverter from "../../common/RatingConverter";

interface ProductCardProps {
  _id : string;
  name: string;
  price: number;
  image: string;
  ratingCount: number;
}
const ProductCard = ({ _id, name, price, image, ratingCount }: ProductCardProps) => {
  return (
    <Link to={`/products/${_id}`} className="block">
      <img
        src={image}
        alt={name}
        className="rounded-lg h-60 object-cover w-full border border-gray-300 "
      />
      <p className="font-semibold my-2 line-clamp-1">{name}</p>
      <RatingConverter count={ratingCount} />
      <p className="text-lg font-medium">${price}</p>
    </Link>
  );
};

export default ProductCard;
