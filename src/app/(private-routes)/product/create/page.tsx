"use client";

import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

export default function ProductRegistrationForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const { data: session } = useSession();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Campo obrigatório"),
    description: Yup.string().required("Campo obrigatório"),
    price: Yup.number().required("Campo obrigatório").min(0),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Etapa 1: Criar o Produto
        const productResponse = await api.post("/products", values, {
          headers: {
            Authorization: `Bearer ${session?.token.token}`,
          },
        });

        console.log(productResponse);

        if (productResponse.status === 201 || productResponse.status === 200) {
          const productId = productResponse.data.id;

          toast({
            variant: "success",
            title: "Produto cadastrado com sucesso!",
          });

          console.log(selectedImage);

          if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);

            const imageResponse = await api.post(
              `/products/${productId}/upload-banner`, // Endpoint para associar a imagem ao produto
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${session?.token.token}`,
                },
              }
            );

            if (imageResponse.status === 200 || imageResponse.status === 201) {
              toast({
                variant: "success",
                title: "Imagem enviada com sucesso!",
              });
            } else {
              throw new Error("Falha ao enviar a imagem");
            }
          }

          formik.resetForm();
          setImagePreview(null);
          setSelectedImage(null);
        } else {
          throw new Error("Falha ao cadastrar o produto");
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.message,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
      <NavBar />
      <main className="mt-28 flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="inter w-96 max-w-2xl mx-auto mb-10">
          <CardHeader>
            <CardTitle>Cadastro de Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Título</Label>
                <Input
                  id="name"
                  placeholder="Digite o título do produto"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : undefined
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  placeholder="Digite a descrição do produto"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  error={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : undefined
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Imagem</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto max-h-48 object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Digite o preço do produto"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  error={
                    formik.touched.price && formik.errors.price
                      ? formik.errors.price
                      : undefined
                  }
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Cadastrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
