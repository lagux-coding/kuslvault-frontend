import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="mb-4 flex flex-col space-y-2 text-left">
        <h1 className="text-3xl font-semibold tracking-wide">Welcome Back</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password below to log into your account.
        </p>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="hover:text-primary underline underline-offset-4 hover:opacity-75"
          >
            Sign Up
          </Link>
        </div>
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
                <Input placeholder="username123" {...field} />
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
                <Input placeholder="********" {...field} />
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
          Sign In
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

      <p className="text-muted-foreground mt-4 px-8 text-center text-sm">
        By continuing, you agree to our{" "}
        <Link to="/terms" className="hover:text-primary underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="hover:text-primary underline underline-offset-4">
          Privacy Policy.
        </Link>
      </p>
    </Form>
  );
};

export default SignIn;
