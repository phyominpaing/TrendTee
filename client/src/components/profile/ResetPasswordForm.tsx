import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { ArrowRight, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ResetPasswordProps {
  email: string;
  className?: string;
}

const ResetPasswordForm = ({ email, className = "" }: ResetPasswordProps) => {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const changePasswordHandler = async () => {
    try {
      const res = await forgotPasswordMutation({
        email,
      }).unwrap();

      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };
  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-slate-200 bg-white/95 shadow-xl shadow-slate-900/5 ${className}`}
    >
      <div className="h-1 bg-linear-to-r from-slate-900 via-sky-600 to-emerald-500" />
      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15">
            <ShieldCheck className="size-5" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-500">
              Password reset
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Send a secure reset link
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                We will email a password reset link to{" "}
                <span className="font-medium text-slate-700">{email}</span> so
                you can update your password safely.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          onClick={changePasswordHandler}
          disabled={isLoading}
          className="h-12 rounded-2xl bg-slate-900 px-5 text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
        >
          {isLoading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Mail className="size-4" />
          )}
          {isLoading ? "Sending..." : "Email reset link"}
          {!isLoading && <ArrowRight className="size-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
