import RatingConverter from "../../common/RatingConverter";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  ratingCount: number;
}
const ProductCard = ({ name, price, image, ratingCount }: ProductCardProps) => {
  return (
    <div>
      <img src={image} alt={name} className="rounded-lg" />
      <p className="font-semibold my-2">{name}</p>
      <RatingConverter count={ratingCount} />
      <p className="text-lg font-medium">${price}</p>
    </div>
  );
};

export default ProductCard;
