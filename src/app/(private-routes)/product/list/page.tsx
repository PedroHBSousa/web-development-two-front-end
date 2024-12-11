"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  banner: string | null | File;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const baseUrl = "http://localhost:3000";

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

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const { id, name, description, price, banner } = editingProduct;

      // Atualiza os dados principais do produto
      await api.put(
        `/products/${id}`,
        { name, description, price },
        {
          headers: {
            Authorization: `Bearer ${session?.token.token}`,
          },
        }
      );

      // Atualiza o banner separadamente, se houver um novo arquivo
      if (banner instanceof File) {
        const formData = new FormData();
        formData.append("file", banner);

        await api.post(`/products/${id}/upload-banner`, formData, {
          headers: {
            Authorization: `Bearer ${session?.token.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast({
        variant: "success",
        title: "Produto atualizado com sucesso!",
      });

      fetchProducts(); // Recarrega a lista de produtos
      closeEditModal();
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar produto",
        description: "Não foi possível salvar as alterações.",
      });
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-357px)] p-8 flex flex-col gap-8 mt-24 mb-32">
        <NavBar />
        <div className="flex justify-center gap-8">
          <div className="flex justify-start">
            <Button
              className="bg-green-500 hover:bg-green-600 rounded"
              onClick={() => router.push("/product/create")}
            >
              Criar Produto
            </Button>
          </div>

          <Card className="flex-1 max-w-4xl">
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
                          src={`${baseUrl}/${product.banner}`}
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
                      <div className="flex gap-2 mt-4">
                        <Button
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => openEditModal(product)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Deletar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Não há produtos cadastrados.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Editar Produto</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Descrição</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setEditingProduct({ ...editingProduct, banner: file });
                    }
                  }}
                  className="w-full border rounded p-2"
                />
                {editingProduct.banner &&
                  editingProduct.banner instanceof File && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(editingProduct.banner)}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500"
                  onClick={closeEditModal}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
