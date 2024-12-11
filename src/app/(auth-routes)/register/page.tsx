"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

export default function Register() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    fullName: Yup.string().required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
    passwordConfirmation: Yup.string()
      .required("Campo obrigatório")
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const { passwordConfirmation, ...user } = values;
      try {
        const response = await api.post("/users", user);
        if (response.status === 200 || response.status === 201) {
          toast({
            variant: "success",
            title: "Usuário cadastrado com sucesso!",
          });
          router.push("/login");
        } else {
          console.error("Registration failed:", response.data);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Falha ao cadastrar usuário",
          description: error.message,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center flex-col justify-between bg-gray-50 text-gray-800">
      <NavBar />
      <main className="flex mt-28 flex-col gap-8 row-start-2 items-center sm:items-start">
        <form onSubmit={formik.handleSubmit}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Cadastro</CardTitle>
              <CardDescription>
                Crie sua conta em poucos passos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="full_name">Nome</Label>
                  <Input
                    id="fullName"
                    placeholder="Digite seu nome"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    error={
                      formik.touched.fullName && formik.errors.fullName
                        ? formik.errors.fullName
                        : undefined
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Confirmar senha</Label>
                  <Input
                    id="passwordConfirmation"
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                    error={
                      formik.touched.passwordConfirmation &&
                      formik.errors.passwordConfirmation
                        ? formik.errors.passwordConfirmation
                        : undefined
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Cadastrar"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
      <Footer />
    </div>
  );
}
