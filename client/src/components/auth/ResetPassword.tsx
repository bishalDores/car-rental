import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { RESET_PASSWORD_MUTATION } from "@/graphql/mutations/user.mutation";
import { toast } from "sonner";
import { LoadingSpinner } from "../layout/LoadingSpinner";
import { ResetPasswordSchema } from "@/zod-schemas/user.schemas";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success("Password has been reset successfully");

      navigate("/");
    },
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const submitHandler = async (data: z.infer<typeof ResetPasswordSchema>) => {
    await resetPassword({
      variables: {
        token: params?.token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/40 justify-center">
          <Card className="mx-auto w-full max-w-lg shadow-lg py-6">
            <CardHeader>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="New Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm Password" {...field} />
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
                      Reset Password <KeyRound className="h-4 w-4 ml-2" />
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

export default ResetPassword;
