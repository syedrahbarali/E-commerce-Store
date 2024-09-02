import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "@/appwrite/auth";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = (data) => {
    setLoading(true);
    authService
      .createAccount({ ...data, phone: "+91" + data.phone })
      .then((response) => {
        if (response?.error) {
          toast.error(response?.error);
          return;
        }

        toast.success("Account created successfully.");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit(handleCreateAccount)} className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="name" required {...register("name")} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required {...register("email")} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Mobile No</Label>
              <Input id="phone" type="phone" required {...register("phone")} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                {...register("confirmPassword")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {loading ? <PulseLoader /> : "Sign up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
