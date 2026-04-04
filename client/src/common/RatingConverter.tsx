import { Star } from "lucide-react";

interface RatingConverterProps {
  count: number;
}
const RatingConverter = ({ count }: RatingConverterProps) => {
  return (
    <div className="flex items-center gap-1 mb-2">
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} size={18}  className=" fill-yellow-400 text-yellow-400"/>
      ))} 
    </div>
  );
};

export default RatingConverter;
