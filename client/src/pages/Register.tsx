import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { registerSchema } from "../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

type formInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formInputs>({
    resolver: zodResolver(registerSchema),
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
          Enter your information to register
        </p>
        <form onSubmit={handleSubmit(submitHandler)} className="mt-4 space-y-2">
          <div className="mb-3">
            <label htmlFor="username" className="text-sm font-semibold mb-4 ">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="eg: Mg Mg ..."
              className="text-sm font-medium border-2 border-gray-300 rounded-md py-2 ps-3 w-full mt-2 focus:outline-none focus:border-slate-400"
              {...register("username")}
            />
            {errors.username && (
              <span className=" text-red-500 text-xs">
                * {errors.username.message} *
              </span>
            )}
          </div>
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
            disabled={isSubmitting}
            className="bg-black w-full py-2 text-white rounded-md"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm font-medium text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
