import { Input } from "../ui/input";
import type { UseFormRegister } from "react-hook-form";

interface NameUpdateFormProps {
  register: UseFormRegister<any>;
}

const NameUpdateForm = ({ register }: NameUpdateFormProps) => {
  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        Full name
      </label>

      <Input
        {...register("name")}
        className="h-11 rounded-xl border-slate-200 bg-white"
      />
    </div>
  );
};

export default NameUpdateForm;
