import type { UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

interface PasswordUpdateFormProps {
  register: UseFormRegister<any>;
  error: any;
}

const PasswordUpdateForm = ({ register, error }: PasswordUpdateFormProps) => {
  return (
    <>
      <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="old-password"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
        >
          Old password
        </label>
        <Input
          type="password"
          placeholder="Enter current password"
          className="h-11 rounded-xl border-slate-200"
          
          {...register("oldPassword")}
        />

        {error.oldPassword && <p className="text-red-500 text-sm">{error.oldPassword.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="new-password"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
        >
          New password
        </label>
        <Input
          type="password"
          placeholder="Enter new password"
          {...register("newPassword")}
          className="h-11 rounded-xl border-slate-200"
        />

        {error.newPassword && <p className="text-red-500 text-sm">{error.newPassword.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="new-password"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
        >
          Confirm password
        </label>
        <Input
          type="password"
          placeholder="Confirm new password"
          {...register("confirmPassword")}
          className="h-11 rounded-xl border-slate-200"
        />

        {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword.message}</p>}
      </div>
</> 
  );
};
export default PasswordUpdateForm;
