import { useEffect, useRef, useState } from "react";
import { forgotPasswordService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { z } from "zod";
import Loader from "@/components/Loader";
import RippleButton from "@/components/custom-ui/RippleButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AnimatedPage from "@/components/wrappers/AnimatedPage";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const formattedCountdown =
    countdown % 60 === 0 ? `${Math.floor(countdown / 60)}:00` : `${countdown}`;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await forgotPasswordService(values.email);
      if (response.data.status === 200) {
        setIsSuccess(true);
        setIsResend(false);
        setCountdown(60);
      } else {
        setErrorMessage("No user found with this email address");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isSuccess && !isResend) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSuccess, isResend]);

  return (
    <AnimatedPage>
      {isSuccess ? (
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-between text-white">
            <p className="text-3xl tracking-tight">Check your email</p>
          </div>
          <p className="text-muted-foreground text-sm">
            Please check your email for a link to reset your password. If you don't see it, check
            your spam folder.
          </p>

          {!isResend && (
            <p className="text-md text-zinc-300">
              If you didn't receive the email, try again in{" "}
              <span className="block">{formattedCountdown}</span>
            </p>
          )}

          <RippleButton
            type="button"
            disabled={isLoading || !isResend}
            className="mt-3 w-full cursor-pointer border-transparent bg-[#26262B] text-white duration-200 hover:bg-zinc-700 hover:text-white active:scale-95"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            {isLoading || !isResend ? (
              <div className="flex items-center gap-2">
                <Loader /> <span className="text-violet-300">Loading...</span>
              </div>
            ) : (
              "Send reset link"
            )}
          </RippleButton>
          <Link
            to="/login"
            className="mt-2 flex items-center justify-center rounded-lg py-2 text-zinc-400 duration-200 hover:text-zinc-500"
          >
            <GoArrowLeft />
            <span> Back to login</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-col space-y-2 text-left">
            <div className="flex items-center justify-between text-white">
              <h1 className="text-md tracking-tight">Forgot Password</h1>
              <Link to="/login" className="flex items-center gap-1 hover:opacity-75">
                <GoArrowLeft />
                <span>Back</span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Enter your registered email and we will send you a link to reset your password
            </p>
          </div>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                          placeholder=" "
                        />
                      </FormControl>
                      <FormLabel className="text-md absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                        Email
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            {/* Error */}
            {errorMessage && (
              <div className="mt-2 flex items-center justify-center rounded-md text-red-500">
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Success */}

            <RippleButton
              type="button"
              disabled={isLoading}
              className="mt-3 w-full cursor-pointer border-transparent bg-[#26262B] text-white duration-200 hover:bg-zinc-700 hover:text-white active:scale-95"
              onClick={() => form.handleSubmit(onSubmit)()}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader /> <span className="text-violet-300">Loading...</span>
                </div>
              ) : (
                "Send reset link"
              )}
            </RippleButton>
          </div>
          <div className="mt-4 px-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="underline underline-offset-4 hover:opacity-75">
              Register
            </Link>
          </div>
        </>
      )}
    </AnimatedPage>
  );
};

export default ForgotPassword;
