import { useEffect, useState } from "react";
import { changePasswordService, resetPasswordService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { set, useForm } from "react-hook-form";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { Navigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import Loader from "@/components/Loader";
import Success from "@/components/Success";
import RippleButton from "@/components/custom-ui/RippleButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };
  useEffect(() => {
    handleResetPassword();
  }, []);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await resetPasswordService(token as string);
      if (response.data.status === 200) {
      } else {
        setErrorMessage("Invalid or expired token");
        setInvalid(true);
        console.log(errorMessage);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setInvalid(false);
    try {
      const response = await changePasswordService(token as string, values);
      if (response.data.status === 200) {
        setSuccess(true);
      } else {
        setInvalid(true);
        setErrorMessage("Invalid or expired token");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.close();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [success]);

  return (
    <>
      {invalid ? (
        <Navigate to="/404" replace={true} state={{ from: "/reset-password" }} />
      ) : (
        <>
          {success ? (
            <>
              <Success />
              <div className="mb-4 flex flex-col space-y-2 text-center">
                <p className="text-md tracking-wide text-white">
                  Password changed successfully!
                  <span className="block text-center">Close in {countdown} seconds...</span>
                </p>
              </div>
            </>
          ) : (
            <Form {...form}>
              <div className="mb-4 flex flex-col space-y-2 text-left">
                <h1 className="text-3xl tracking-wide text-white">Change password</h1>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            tabIndex={-1}
                            {...field}
                            className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            placeholder=" "
                          />
                          <FormLabel className="text-md pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                            New password
                          </FormLabel>
                          <button
                            type="button"
                            onClick={() => {
                              togglePasswordVisibility("password");
                            }}
                            tabIndex={-1}
                            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
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
                            tabIndex={-1}
                            {...field}
                            className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            placeholder=" "
                          />
                          <FormLabel className="text-md pointer-events-none absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                            Confirm new password
                          </FormLabel>
                          <button
                            type="button"
                            onClick={() => {
                              togglePasswordVisibility("confirmPassword");
                            }}
                            tabIndex={-1}
                            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
                          >
                            {showConfirmPassword ? (
                              <GrFormView size={24} />
                            ) : (
                              <GrFormViewHide size={24} />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <RippleButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer border-transparent bg-[#26262B] text-white duration-200 hover:bg-zinc-700 hover:text-white active:scale-95"
                  onClick={() => {
                    console.log("text");
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader /> <span className="text-violet-300">Loading...</span>
                    </div>
                  ) : (
                    "Reset"
                  )}
                </RippleButton>
              </form>
            </Form>
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
