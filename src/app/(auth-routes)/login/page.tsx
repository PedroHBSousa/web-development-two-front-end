"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      window.location.href = "/product/create";
    },
  });

  return (
    <div className="min-h-screen flex items-center flex-col justify-between bg-gray-50 text-gray-800">
      <NavBar />
      <main className="flex mt-28 flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Insira suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : undefined
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : undefined
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center">
              {"Não tem uma conta? "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Criar Conta
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      <Footer />
    </div>
  );
}
