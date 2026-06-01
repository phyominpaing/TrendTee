import { zodResolver } from "@hookform/resolvers/zod";
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
import { forgotPasswordSchema } from "@/schema/auth";
import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect } from "react";

type FormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
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
      const res = await forgotPasswordMutation({
        email: data.email,
      }).unwrap();
      toast.success(res?.message || "Password reset link sent.");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to send reset link.");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const toFieldErrors = (error?: { message?: string }) =>
    error ? [{ message: error.message }] : undefined;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)]" />

      <Card className="relative w-full max-w-md gap-0 overflow-hidden rounded-[28px] border border-white/80 bg-white/92 shadow-[0_32px_90px_-38px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="h-1 bg-[linear-gradient(90deg,#0f172a_0%,#0284c7_55%,#14b8a6_100%)]" />

        <CardHeader className="space-y-5 px-6 pb-3 pt-8 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15">
              <ShieldCheck className="size-5" />
            </div>

            <Link
              to="/login"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium tracking-[0.18em] uppercase text-slate-500 transition hover:bg-slate-100"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back
            </Link>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-700">
              Account Recovery
            </div>
            <CardTitle className="text-3xl font-semibold tracking-tight text-slate-950">
              Forgot your password?
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-500">
              Enter your account email and we will send you a secure reset link
              to help you get back into TrendTee.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-4 sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
                </FieldLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-slate-900 shadow-sm shadow-slate-950/5 transition focus-visible:border-sky-400 focus-visible:ring-sky-100"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                </div>
                <FieldError errors={toFieldErrors(errors.email)} />
              </Field>
            </FieldGroup>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/85 p-4 text-sm leading-6 text-slate-500">
              We will only use this email to send password recovery
              instructions.
            </div>

            <Button
              type="submit"
              size="lg"
              className="group h-12 w-full rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading
                ? "Sending link..."
                : "Send reset link"}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPassword;
