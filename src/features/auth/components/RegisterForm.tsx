import { useState } from "react";
import { registerService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "@/config/axios";
import Loader from "@/components/Loader";
import RippleButton from "@/components/custom-ui/RippleButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GithubButton, GoogleButton } from "../components";

const formSchema = z
  .object({
    username: z
      .string()
      .min(6, {
        message: "Username must be at least 6 characters.",
      })
      .max(50, {
        message: "Username must be at most 50 characters.",
      }),

    email: z.string().email("Invalid email address."),

    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),

    confirmPassword: z.string().min(6, {
      message: "Password must be at least 8 characters.",
    }),
    termsAgreement: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms of Service and Privacy Policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  // 1. Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAgreement: false,
    },
  });

  // 2. Define a submit handler.
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerService(values);

      if (response.data.status === 200) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Somthing went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <div className="w-full">
        <h1 className="text-center text-3xl font-semibold">Create an account</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <input
                  autoComplete="username"
                  disabled={isLoading}
                  {...field}
                  className="peer block w-full appearance-none border-0 border-b-2 border-black/20 bg-transparent px-0 py-3 text-sm focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:focus:border-blue-500"
                  placeholder=" "
                />
              </FormControl>
              <FormLabel className="pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                Username
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <input
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                  className="peer block w-full appearance-none border-0 border-b-2 border-black/20 bg-transparent px-0 py-3 text-sm focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:focus:border-blue-500"
                  placeholder=" "
                />
              </FormControl>
              <FormLabel className="pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                Email
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                    className="peer block w-full appearance-none border-0 border-b-2 border-black/20 bg-transparent px-0 py-3 text-sm focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                    placeholder=" "
                  />
                  <FormLabel className="pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                    Password
                  </FormLabel>
                  <button
                    type="button"
                    onClick={() => {
                      togglePasswordVisibility("password");
                    }}
                    tabIndex={-1}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-black"
                  >
                    {showPassword ? <GrFormView size={24} /> : <GrFormViewHide size={24} />}
                  </button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                    className="peer block w-full appearance-none border-0 border-b-2 border-black/20 bg-transparent px-0 py-3 text-sm focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:focus:border-blue-500"
                    placeholder=" "
                  />
                  <FormLabel className="pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                    Confirm Password
                  </FormLabel>
                  <button
                    type="button"
                    onClick={() => {
                      togglePasswordVisibility("confirmPassword");
                    }}
                    tabIndex={-1}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-black"
                  >
                    {showConfirmPassword ? <GrFormView size={24} /> : <GrFormViewHide size={24} />}
                  </button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAgreement"
          render={({ field }) => (
            <FormItem className="mt-6 mb-6 flex flex-row justify-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer border border-[#71717B] duration-200 hover:border-zinc-500 data-[state=checked]:bg-black"
                />
              </FormControl>

              <FormLabel className="text-xs text-black/70">
                I agree to KuslVault’s Terms of Service and Privacy Policy
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Error message */}
        {error && (
          <FormDescription className="text-left text-sm text-red-600">{error}</FormDescription>
        )}

        {/* Submit button */}
        <RippleButton
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer border-transparent bg-[#5E49D8] text-white shadow-lg shadow-black/16 duration-200 hover:bg-[#6B53F6] active:scale-95"
          onClick={() => {
            console.log("text");
          }}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader /> <span className="text-violet-300">Loading...</span>
            </div>
          ) : (
            "Register"
          )}
        </RippleButton>
      </form>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <span className="w-1/3 border-t border-[#E1E0E5]"></span>
          <span className="text-xs text-[#737379]">Or login with</span>
          <span className="w-1/3 border-t border-[#E1E0E5]"></span>
        </div>
      </div>

      {/* Oauth 2 */}
      <div className="flex items-center gap-2">
        <GoogleButton setError={setError} isLoading={isLoading} setIsLoading={setIsLoading} />

        <GithubButton isLoading={isLoading} />
      </div>

      <div className="mt-2 text-center text-sm text-black/50">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#4C3CC6] underline underline-offset-4 hover:text-[#5756bb]"
        >
          Login
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
