import { Button } from "@/components/ui/button";

interface SizeSelectorProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

const SizeSelector = ({ sizes, onChange }: SizeSelectorProps) => {
  const availableSizes = ["xs", "sm", "lg", "xl", "xxl"];

  const toggleSize = (selectedSize: string) => {
    if (sizes.includes(selectedSize)) {
      onChange(sizes.filter((size) => size !== selectedSize));
    } else {
      onChange([...sizes, selectedSize]);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {availableSizes.map((size, index) => (
        <Button
          type="button"
          key={index}
          variant={"outline"}
          onClick={() => toggleSize(size)}
          className={`${sizes.includes(size) ? "bg-black text-white hover:bg-black hover:text-white" : ""}`}
        >
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default SizeSelector;
