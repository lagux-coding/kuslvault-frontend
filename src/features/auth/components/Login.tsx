import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "@/config/axios";
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

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  remember: z.boolean().default(false).optional(),
});

const SignIn = () => {
  // 1. Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  // 2. Define a submit handler.
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post("/auth/login", values, {
        withCredentials: true,
      });
      if (response.data.status === 200) {
        login();
        navigate("/");
      } else if (response.data.status === 2003) {
        form.setError("username", { type: "manual" });
        form.setError("password", { message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Login failed:", error);
      form.setError("root", { message: "Invalid username or password" });
    }
  }

  return (
    <Form {...form}>
      <div className="mb-4 flex flex-col space-y-2 text-left">
        <h1 className="text-3xl tracking-wide text-white">Welcome Back</h1>
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
                  type="text"
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
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <input
                  type="password"
                  autoComplete="current-password"
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

        {/* Remember me */}
        <div className="flex items-center justify-between">
          {/* <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer border border-zinc-400"
                  />
                </FormControl>

                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          /> */}

          <Link
            to="/forgot-password"
            tabIndex={-1}
            className="text-sm text-gray-300 hover:opacity-75"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#A118FE] transition-colors hover:bg-[#8906e0]"
        >
          Login
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
        Don't have an account?{" "}
        <Link to="/sign-up" className="underline underline-offset-4 hover:opacity-75">
          Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default SignIn;
