import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { loginSchema } from "../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

type formInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formInputs>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<formInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="flex flex-1 w-full justify-center items-center py-8">
      <div className="w-1/2 border-2 border-gray-200 rounded-md p-4">
        <h2 className="font-semibold text-2xl text-center mt-4 mb-2">
          TrendTee.com
        </h2>
        <p className="text-sm font-medium text-gray-400 text-center">
          ✨ Welcome to TrendTee ✨
        </p>
        <p className="text-sm font-medium text-gray-400 text-center">
          Enter your email and password to login
        </p>
        <form onSubmit={handleSubmit(submitHandler)} className="mt-4 space-y-2">
          <div className="mb-3">
            <label htmlFor="email" className="text-sm font-semibold mb-4 ">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="eg: mgmg@gmail.com"
              className="text-sm font-medium border-2 border-gray-300 rounded-md py-2 ps-3 w-full mt-2 focus:outline-none focus:border-slate-400"
              {...register("email")}
            />
            {errors.email && (
              <span className=" text-red-500 text-xs">
                * {errors.email.message} *
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="text-sm font-semibold mb-4 ">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="text-sm font-medium border-2 border-gray-300 rounded-md py-2 ps-3 w-full mt-2 focus:outline-none focus:border-slate-400"
              {...register("password")}
            />
            {errors.password && (
              <span className=" text-red-500 text-xs">
                * {errors.password.message} *
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 rounded-md w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm font-medium text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
