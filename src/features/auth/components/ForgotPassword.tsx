import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { z } from "zod";
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
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <div className="flex items-center justify-between">
          <h1 className="text-md font-semibold tracking-tight">Forgot Password</h1>
          <Link to="/signin" className="text-primary flex items-center gap-1 hover:opacity-75">
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
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Send Reset Link
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-muted-foreground mt-4 px-8 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="hover:text-primary underline underline-offset-4">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
