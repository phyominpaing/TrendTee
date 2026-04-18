import { Input } from "../ui/input";
import type { UseFormRegister, FieldError } from "react-hook-form";

interface NameUpdateFormProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

const NameUpdateForm = ({ register, error }: NameUpdateFormProps) => {
  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
        Full name
      </label>

      <Input
        {...register("name")}
        className="h-11 rounded-xl border-slate-200 bg-white"
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default NameUpdateForm;
