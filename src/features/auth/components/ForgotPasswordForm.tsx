import { useEffect, useRef, useState } from "react";
import { forgotPasswordService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@stomp/stompjs";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
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

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(300);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const formattedCountdown = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

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
        console.log(response.data.data);
        subscribeReset(response.data.data);
        setIsSuccess(true);
        setIsResend(false);
        setCountdown(300);
      } else {
        setErrorMessage("No user found with this email address");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  const subscribeReset = (token: string) => {
    const socket = new SockJS("http://localhost:8080/ws");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe(`/topic/password-reset/${token}`, (message) => {
          if (message.body === "PASSWORD_RESET_SUCCESS") {
            console.log("Password reset success!");
            navigate("/login");
          }
        });
      },
      debug: (msg) => console.log("[STOMP]", msg),
      reconnectDelay: 5000,
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  };

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

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="w-full">
      {isSuccess ? (
        <div className="mt-4 flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold">Check your email</h1>

          <p className="text-sm text-black/50">
            Please check your email for a link to reset your password. If you don't see it, check
            your spam
          </p>

          {!isResend && (
            <p className="text-md">
              If you didn't receive the email, try again in{" "}
              <span className="block text-center text-lg text-emerald-500">
                {formattedCountdown}s
              </span>
            </p>
          )}

          <RippleButton
            type="button"
            disabled={isLoading || !isResend}
            className="mt-2 w-full cursor-pointer border-transparent bg-[#5E49D8] text-white shadow-lg shadow-black/16 duration-200 hover:bg-[#6B53F6] active:scale-95"
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
          <RippleButton
            onClick={handleNavigate}
            className="mt-2 w-full cursor-pointer border-1 border-black/50 bg-transparent duration-200 active:scale-95"
          >
            <img src="/svg/arrow_back.svg" alt="Arrow Back" className="text-black" />
            Back to login
          </RippleButton>
        </div>
      ) : (
        <>
          <div className="mt-4 mb-4 flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold">Forgot password</h1>

            <p className="text-muted-foreground text-sm">
              Enter your registered email and we will send you a link to reset your password
            </p>
          </div>
          <div className="w-full">
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
                          className="peer block w-full appearance-none border-0 border-b-2 border-black/20 bg-transparent px-0 py-3 text-sm focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:focus:border-blue-500"
                          placeholder=" "
                        />
                      </FormControl>
                      <FormLabel className="absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                        Email
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Error */}
                {errorMessage && (
                  <div className="mt-2 flex items-center justify-center rounded-md text-red-500">
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Submit Button */}

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
                    "Send reset link"
                  )}
                </RippleButton>
              </form>
            </Form>
          </div>

          <RippleButton
            onClick={handleNavigate}
            className="mt-2 w-full cursor-pointer border-1 border-black/50 bg-transparent duration-200 active:scale-95"
          >
            <img src="/svg/arrow_back.svg" alt="Arrow Back" className="text-black" />
            Back to login
          </RippleButton>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
