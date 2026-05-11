import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const categories = [
  { id: "t-shirt", label: "T-Shirt" },
  { id: "hoodie", label: "Hoodie" },
  { id: "shorts", label: "Shorts" },
  { id: "jeans", label: "Jeans" },
  { id: "shoe", label: "Shoe" },
];
const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
