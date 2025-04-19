import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import get from "lodash/get";
import * as Yup from "yup";
import { useApi } from "@/hooks/use-api.ts";
import { useAppContext } from "@/context.tsx";
import { actions } from "@/constants/actions.ts";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { dispatch } = useAppContext();
  const { loading, postRequest } = useApi();
  const navigate = useNavigate();
  const [error, setError] = useState<string | boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("A name is required"),
      email: Yup.string()
        .email("A valid email is required")
        .required("An email is required"),
      password: Yup.string().required("A password is required"),
    }),
    onSubmit: async (values) => {
      setError(false);
      try {
        const res = await postRequest("auth/register", { ...values });
        if (res?.data) {
          dispatch({
            type: actions.UPDATE_USER,
            payload: {
              details: res.data.user,
              token: res.data.token,
            },
          });
          navigate("/");
        } else {
          setError("An error has occurred");
        }
      } catch (err) {
        const errMsg = get(err, "response.data.error", "An error occurred.");
        formik.values.name = "";
        formik.values.email = "";
        formik.values.password = "";
        setError(errMsg);
      }
    },
  });
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-xs text-balance">
                  Login to your LinkSaver Inc account
                </p>
              </div>
              <div className="grid gap-3">
                <Label className="text-xs" htmlFor="email">
                  Name
                </Label>
                <Input
                  id="name"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-xs" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label className="text-xs" htmlFor="password">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                className="w-full"
                disabled={loading}
              >
                Login
              </Button>

              <div className="text-center text-xs">
                Don&apos;t have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {error && <p className="bg mx-auto text-xs text-red-500">{error}</p>}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </div>
    </div>
  );
}
