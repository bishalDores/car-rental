import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { MailPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { FORGOT_PASSWORD_MUTATION } from "@/graphql/mutations/user.mutation";
import { toast } from "sonner";
import { ForgotPasswordSchema } from "@/zod-schemas/user.schemas";
import { LoadingSpinner } from "../layout/LoadingSpinner";

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success("Please check your email to reset your password");
    },
  });

  useEffect(() => {
    if (error) toast.error(error?.message || "Something went wrong");
  }, [error]);

  const submitHandler = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    await forgotPassword({
      variables: { email: data?.email },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/40 justify-center">
          <Card className="mx-auto w-full max-w-lg shadow-lg py-6">
            <CardHeader>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
              <CardDescription>Enter your email to receive a password reset link</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="hello@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      Send Email <MailPlus className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
