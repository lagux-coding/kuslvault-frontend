import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUp = () => {
  // 1. Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="mb-4 flex flex-col space-y-2 text-left">
        <h1 className="text-3xl font-semibold tracking-wide text-white">Create your account</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <input
                  autoComplete="username"
                  {...field}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
              </FormControl>
              <FormLabel className="text-md absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
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
                  {...field}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
              </FormControl>
              <FormLabel className="text-md absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
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
                <input
                  type="password"
                  autoComplete="new-password"
                  {...field}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
              </FormControl>
              <FormLabel className="text-md absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                Password
              </FormLabel>
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
                <input
                  type="password"
                  autoComplete="new-password"
                  {...field}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
              </FormControl>
              <FormLabel className="text-md absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                Confirm Password
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#A118FE] transition-colors hover:bg-[#8906e0]"
        >
          Sign Up
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="rounded-lg bg-black px-4 text-white backdrop-blur-lg">Or</span>
        </div>
      </div>

      {/* Oauth 2 */}
      <div className="flex flex-col items-center gap-2">
        <Button
          variant="outline"
          className="w-full cursor-pointer border-purple-500 hover:bg-purple-500"
        >
          <img src="/svg/github.svg" alt="Github" className="h-4 w-4" /> Github
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer border-purple-500 hover:bg-purple-500"
        >
          <img src="/svg/gmail.svg" alt="Gmail" className="h-4 w-4" /> Gmail
        </Button>
      </div>

      <div className="mt-2 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4 hover:opacity-75">
          Login
        </Link>
      </div>
    </Form>
  );
};

export default SignUp;
