import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

const ColorPicker = ({ colors, onChange }: ColorPickerProps) => {
  const [inputColor, setInputColor] = useState("#000000");
  const addColor = () => {
    if (!colors.includes(inputColor)) {
      onChange([...colors, inputColor]);
      setInputColor("#000000");
    }
  };

  const removeColor = (selectedColor: string) => {
    onChange(colors.filter((color) => color !== selectedColor));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          className="w-40 "
        />
        <Button type="button" variant={"outline"} onClick={addColor}>
          Add Color
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {colors.map((color, index) => (
          <div
            key={index}
            className="relative group flex items-center gap-1 p-2 rounded-md border"
          >
            <div
              style={{ backgroundColor: color }}
              className="w-6 h-6 border rounded-full"
            />
            <span className="text-sm">{color}</span>
            <button
              type="button"
              onClick={() => removeColor(color)}
              className="absolute -top-2 -right-2 bg-slate-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <X size={12} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
