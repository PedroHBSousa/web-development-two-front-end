"use client"; 

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  banner: string | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(); 
  const { toast } = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts(); 
    } else if (status === "unauthenticated") {
      window.location.href = "/login"; 
    }
  }, [status]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${session?.token.token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          variant: "destructive",
          title: "Erro de autenticação",
          description: "Por favor, faça login novamente.",
        });
        window.location.href = "/login";
      } else {
        console.error("Erro ao buscar produtos:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const confirmed = confirm("Tem certeza que deseja deletar este produto?");
      if (!confirmed) return;

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.token.token}`,
        },
      });

      toast({
        variant: "success",
        title: "Produto deletado com sucesso!",
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error);
      toast({
        variant: "destructive",
        title: "Erro ao deletar produto",
        description: error.message || "Não foi possível deletar o produto.",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-8">
        <Card className="max-w-4xl mx-auto mt-24 mb-32">
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Carregando produtos...</p>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-md p-4 shadow-sm"
                  >
                    {product.banner ? (
                      <img
                        src={product.banner}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                        <p>Sem imagem</p>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mt-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-gray-800 font-bold mt-2">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Editar
                      </Button>
                    <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 ml-2"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Deletar
                      </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Não há produtos cadastrados.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
