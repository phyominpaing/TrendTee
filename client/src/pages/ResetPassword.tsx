import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassswordSchema } from "@/schema/auth";
import { toast } from "sonner";

type FormValues = z.infer<typeof resetPassswordSchema>;

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(resetPassswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // const res = await loginMutation(data).unwrap();
      // dispatch(setUserInfo(res));
      // reset();
      // toast.success("Login successful.");
      navigate("/");
    } catch (error: any) {
      toast.error(`Login failed. ${error.data.message} . Please try again.`);
      console.log(error);
    }
    reset();
  };

  // Form error handling, we need to convert the error object to an array of errors with a message property, because the FieldError component expects an array of errors. If there is no error, we return undefined.
  const toFieldErrors = (error?: { message?: string }) =>
  error ? [{ message: error.message }] : undefined;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden] px-4 py-10">
      <div className="absolute inset-0]" />

      <Card className="relative w-full gap-0 max-w-md overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f172a_0%,#0284c7_50%,#14b8a6_100%)]" />

        <CardHeader className="space-y-5 px-6 pb-2 pt-8 sm:px-8">
          <div className="flex items-center justify-between ">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15">
              <ShieldCheck className="size-5" />
            </div>
            <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium tracking-[0.2em] text-emerald-700 uppercase">
              Secure Reset
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-semibold tracking-tight text-slate-950">
              Create new password
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-500">
              Choose a strong password you have not used before to keep your
              TrendTee account protected.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-4 sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="space-y-4">
              <Field>
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel
                    htmlFor="newPassword"
                    className="text-sm font-medium text-slate-700"
                  >
                    New Password
                  </FieldLabel>
                  {/* <span className="text-xs font-medium text-slate-400">
                    Minimum 6 characters
                  </span> */}
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-slate-900 shadow-sm shadow-slate-950/5 transition focus-visible:border-sky-400 focus-visible:ring-sky-100"
                    aria-invalid={!!errors.newPassword}
                    {...register("newPassword")}
                  />
                </div>
                <FieldError errors={toFieldErrors(errors.newPassword)} />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-slate-700"
                >
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your new password"
                    className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-slate-900 shadow-sm shadow-slate-950/5 transition focus-visible:border-sky-400 focus-visible:ring-sky-100"
                    aria-invalid={!!errors.confirmPassword}
                    {...register("confirmPassword")}
                  />
                </div>
                <FieldError errors={toFieldErrors(errors.confirmPassword)} />
              </Field>
            </FieldGroup>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm leading-6 text-slate-500">
              Use a mix of letters, numbers, and symbols for a stronger
              password.
            </div>

            <Button
              type="submit"
              size="lg"
              className="group h-12 w-full rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
            >
              Reset Password
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPassword;
