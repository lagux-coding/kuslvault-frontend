import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { z } from "zod";
import Loader from "@/components/Loader";
import RippleButton from "@/components/kusl-ui/RippleButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
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
                "Send OTP to Email"
              )}
            </RippleButton>
          </form>
        </Form>
      </div>
      <div className="mt-4 px-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="underline underline-offset-4 hover:opacity-75">
          Register
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
