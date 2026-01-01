import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PASSWORD_MUTATION } from "@/graphql/mutations/user.mutation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema } from "@/zod-schemas/user.schemas";
import { z } from "zod";
import { useEffect } from "react";

const UpdatePassword = () => {
  const [UpdatePassword, { loading, error }] = useMutation(UPDATE_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success("Password updated successfully");
    },
  });
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const onSubmitHandler = async (data: z.infer<typeof UpdatePasswordSchema>) => {
    const passwords = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      await UpdatePassword({
        variables: passwords,
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <div className="flex flex-1 flex-col gap-4 bg-muted/40 justify-center">
          <Card className="mx-auto w-full max-w-lg shadow-lg pt-6 pb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Update Password</CardTitle>
              <CardDescription>Enter your password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your old password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePassword;
