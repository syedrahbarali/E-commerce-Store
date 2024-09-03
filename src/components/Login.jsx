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
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data) => {
    setLoading(true);
    authService
      .login({ ...data })
      .then((userData) => {
        if (userData?.error) {
          toast.error(userData?.error);
          return;
        }

        dispatch(login({ userData }));
        toast.success("Logged in successfully");
        navigate(location?.state?.from || "/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit(handleLogin)} className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Log in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required {...register("email")} />
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
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {loading ? <PulseLoader /> : "Log in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
