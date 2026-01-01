import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useReactiveVar } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/graphql/mutations/user.mutation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/zod-schemas/user.schemas";
import { z } from "zod";
import { isAuthenticatedVar } from "@/apollo/apollo-vars";
import { useEffect } from "react";
import { CURRENT_USER } from "@/graphql/queries/user.queries";

const Login = () => {
  const isAuthenticated = useReactiveVar(isAuthenticatedVar);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (data: z.infer<typeof LoginSchema>) => {
    try {
      await login({
        variables: { email: data.email, password: data.password },
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <div className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/40 justify-center">
          <Card className="mx-auto w-full max-w-lg shadow-lg pt-6 pb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your email & password</CardDescription>
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
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link to={"/password/forgot"} className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  Sign In <LogIn className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="underline">
                  Sign Up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default Login;
