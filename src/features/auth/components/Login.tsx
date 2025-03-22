import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "@/config/axios";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
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
        <h1 className="text-3xl font-semibold tracking-wide">Welcome Back</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoComplete="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" {...field} />
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
                    className="cursor-pointer border border-zinc-400"
                  />
                </FormControl>

                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Link
            to="/forgot-password"
            tabIndex={-1}
            className="text-muted-foreground text-sm hover:opacity-75"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </form>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Or continue with</span>
        </div>
      </div>

      {/* Oauth 2 */}
      <div className="flex items-center gap-2">
        <Button variant="outline" className="w-1/2 cursor-pointer">
          <img src="/svg/github.svg" alt="Github" className="h-4 w-4" /> Github
        </Button>
        <Button variant="outline" className="w-1/2 cursor-pointer">
          <img src="/svg/gmail.svg" alt="Gmail" className="h-4 w-4" /> Gmail
        </Button>
      </div>

      <div className="mt-2 text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/sign-up"
          className="hover:text-primary underline underline-offset-4 hover:opacity-75"
        >
          Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default SignIn;
