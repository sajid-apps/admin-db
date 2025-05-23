"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "../ui/icon";
import LabelInputContainer from "./LabelInputContainer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAccountFormSchema } from "@/schemas/FormsValidation";
import { useUserLogin } from "@/hooks/apis/useUserAuth";
import ForgotPasswordModal from "./forms-modal/auth/ForgotPassword";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState<boolean>(false);

  const { mutate: employeerLogin, isPending: loading } = useUserLogin();

  const form = useForm<z.infer<typeof loginAccountFormSchema>>({
    resolver: zodResolver(loginAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginAccountFormSchema>) => {
    employeerLogin(data);
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-medium">Welcome back</CardTitle>
            <CardDescription>
              Login with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="py-3" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-5">
                  <div className="grid gap-5">
                    <LabelInputContainer>
                      <Label htmlFor="email">Email</Label>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter Your Email"
                                type="email"
                                id="email"
                                className="outline-none focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </LabelInputContainer>
                    <div className="grid gap-2">
                      <LabelInputContainer>
                        <Label htmlFor="password">Password</Label>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="relative">
                              <FormControl>
                                <Input
                                  placeholder="••••••••"
                                  type={showPassword ? "text" : "password"}
                                  id="password"
                                  className="outline-none focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                              {!showPassword ? (
                                <Icon
                                  name="Eye"
                                  size={18}
                                  className={cn(
                                    "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                                    !!form.formState.errors.password
                                      ? "top-[20%]"
                                      : "top-[32%]"
                                  )}
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ) : (
                                <Icon
                                  name="EyeOff"
                                  size={20}
                                  className={cn(
                                    "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                                    !!form.formState.errors.password
                                      ? "top-[20%]"
                                      : "top-[32%]"
                                  )}
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </LabelInputContainer>
                      <p
                        className="dark:text-estateLightGray400 text-sm max-w-sm cursor-pointer underline"
                        onClick={() =>
                          setForgotPasswordModalOpen((prev) => !prev)
                        }
                      >
                        Forget Password ?
                      </p>
                    </div>
                    <Button type="submit" className="w-full">
                      {loading ? "Logging..." : "Login"}
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        onOpenChange={setForgotPasswordModalOpen}
      />
    </>
  );
}
