import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form";
import { useMutation, useReactiveVar } from "@apollo/client/react";
import { UPDATE_PROFILE_MUTATION } from "@/graphql/mutations/user.mutation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "@/zod-schemas/user.schemas";
import { z } from "zod";
import { useEffect } from "react";
import { userVar } from "@/apollo/apollo-vars";

const UpdateProfile = () => {
  const user = useReactiveVar(userVar);
  const [UpdateUserProfile, { loading, error }] = useMutation(UPDATE_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success("Profile updated successfully");
    },
  });
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("phoneNo", user.phoneNo);
    }
  }, [user]);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const onSubmitHandler = async (data: z.infer<typeof UpdateProfileSchema>) => {
    const userInput = {
      email: data.email,
      name: data.name,
      phoneNo: data.phoneNo,
    };
    try {
      await UpdateUserProfile({
        variables: { userInput },
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
              <CardTitle className="text-2xl">Update Profile</CardTitle>
              <CardDescription>Enter your details to update your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
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

export default UpdateProfile;
