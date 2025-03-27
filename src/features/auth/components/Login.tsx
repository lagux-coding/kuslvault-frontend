import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { loginService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Loader from "@/components/Loader";
import RippleButton from "@/components/kusl-ui/RippleButton";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
    setIsLoading(true);
    setError(null);

    try {
      console.log(values);
      const response = await loginService(values);
      console.log(response);

      if (response.data.status === 200) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        login();
        navigate("/");
      } else if (response.data.status === 2003) {
        form.setError("username", { type: "manual" });
        form.setError("password", { message: "Invalid username or password" });
      }
    } catch (error) {
      setError("Somthing went wrong. Please try again later.");
      form.setError("root", { message: "Invalid username or password" });
    } finally {
      setIsLoading(false);
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
                  disabled={isLoading}
                  {...field}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
              </FormControl>
              <FormLabel className="text-md absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent px-0 py-3 text-sm text-white focus:border-violet-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                    placeholder=" "
                  />
                  <FormLabel className="text-md absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-80 peer-focus:text-violet-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-violet-500">
                    Password
                  </FormLabel>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
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

        {/* Remember me */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer border border-zinc-400 duration-200 hover:border-zinc-500 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                </FormControl>

                <div className="space-y-1 leading-none text-zinc-400">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Link
            to="/forgot-password"
            tabIndex={-1}
            className="text-sm text-gray-500 hover:opacity-75"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <FormDescription className="text-left text-sm text-red-400">{error}</FormDescription>
        )}

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
            "Login"
          )}
        </RippleButton>
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
        <RippleButton
          disabled={isLoading}
          className="w-full cursor-pointer border-transparent bg-[#26262B] text-white duration-100 hover:bg-zinc-700 hover:text-white active:scale-95"
        >
          <img src="/svg/gmail.svg" alt="Gmail" className="h-5 w-5 text-white" /> Continue with
          Google
        </RippleButton>
        <RippleButton
          disabled={isLoading}
          className="w-full cursor-pointer border-transparent bg-[#26262B] text-white duration-100 hover:bg-zinc-700 hover:text-white active:scale-95"
        >
          <img src="/svg/github.svg" alt="Github" className="h-5 w-5" /> Continue with Github
        </RippleButton>
      </div>

      <div className="mt-2 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link to="/register" className="underline underline-offset-4 hover:opacity-75">
          Register
        </Link>
      </div>
    </Form>
  );
};

export default SignIn;
