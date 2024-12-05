"use client";

import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

export default function ProductRegistrationForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Campo obrigatório"),
    description: Yup.string().required("Campo obrigatório"),
    price: Yup.number().required("Campo obrigatório").min(0),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setIsSubmitting(true);
        const response = await api.post("/products", values);
        if (response.status === 200 || response.status === 201) {
          toast({
            variant: "success",
            title: "Produto cadastrado com sucesso!",
          });
        } else {
          console.error("Product registration failed:", response.data);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Falha ao cadastrar produto",
          description: error.message,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="inter grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="inter w-96 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Cadastro de Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Digite o título do produto"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  error={
                    formik.touched.title && formik.errors.title
                      ? formik.errors.title
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
    </div>
  );
}
