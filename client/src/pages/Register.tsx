import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { registerSchema } from "../schema/auth";

type FormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    reset();
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <Card className="grid w-full overflow-hidden border border-white/60 bg-white/85 shadow-2xl shadow-slate-900/10 backdrop-blur xl:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-[linear-gradient(160deg,rgba(15,23,42,0.98)_0%,rgba(30,41,59,0.95)_45%,rgba(14,116,144,0.92)_100%)] p-8 text-white xl:flex xl:flex-col xl:justify-between">
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs tracking-[0.24em] uppercase text-white/75">
                TrendTee
              </div>
              <div className="space-y-3">
                <h1 className="max-w-sm text-4xl font-semibold tracking-tight">
                  Create your account and start shopping smarter.
                </h1>
                <p className="max-w-md text-sm leading-6 text-white/70">
                  Join TrendTee to save your favorite styles, follow every
                  order, and check out faster whenever a new collection drops.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-white/75">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                  Keep your wishlist, order history, and delivery details in one
                  secure account.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                  Be first in line for fresh arrivals, limited offers, and a
                  smoother checkout across devices.
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-white/80">
            <div className="w-full">
              <CardHeader className="space-y-3 px-6 pt-8 py-6 sm:px-8">
                <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium tracking-[0.24em] uppercase text-slate-500 xl:hidden">
                  TrendTee
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-3xl font-semibold tracking-tight text-slate-900">
                    Create account
                  </CardTitle>
                  <CardDescription className="max-w-md text-sm leading-6 text-slate-500">
                    Enter your details to unlock a faster and more personalized
                    shopping experience.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-8 sm:px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FieldGroup className="space-y-2">
                    <Field data-invalid={!!errors.username}>
                      <FieldLabel htmlFor="username" className="text-slate-700">
                        Username
                      </FieldLabel>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          className="h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm shadow-slate-950/5"
                          aria-invalid={!!errors.username}
                          {...register("username")}
                        />
                      </div>
                      <FieldError errors={[errors.username]} />
                    </Field>

                    <Field data-invalid={!!errors.email}>
                      <FieldLabel htmlFor="email" className="text-slate-700">
                        Email
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className="h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm shadow-slate-950/5"
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                      </div>
                      <FieldError errors={[errors.email]} />
                    </Field>

                    <Field data-invalid={!!errors.password}>
                      <div className="flex items-center justify-between gap-3">
                        <FieldLabel
                          htmlFor="password"
                          className="text-slate-700"
                        >
                          Password
                        </FieldLabel>
                       
                      </div>
                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          className="h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm shadow-slate-950/5"
                          aria-invalid={!!errors.password}
                          {...register("password")}
                        />
                      </div>
                      <FieldError errors={[errors.password]} />
                    </Field>
                  </FieldGroup>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Create account"}
                    <ArrowRight className="size-4" />
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-slate-900 transition hover:text-slate-700"
                  >
                    Sign in
                  </Link>
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Register;
