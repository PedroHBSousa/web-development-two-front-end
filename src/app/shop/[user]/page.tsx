"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import api from "@/lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  banner: string;
}

interface Props {
  params: Promise<{ user: string }>;
}

export default function Shop({ params }: Props) {
  const unwrappedParams = React.use(params);
  const user = unwrappedParams?.user;
  const [userName, setUserName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchUserName = async () => {
    try {
      const response = await api.get(`/users/${user}`);
      setUserName(response.data.fullName);
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
    }
  };

  const fetchProducts = async () => {
    const response = await api.get(`/shop/${user}`);
    setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
    fetchUserName();
  }, []);

  return (
    <div className="inter flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold mt-4">
        Página de Produtos de {userName}
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Aqui você encontra os melhores produtos do mercado.
      </p>
      <div className="flex flex-wrap justify-center mb-10 gap-4 max-w-7xl">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
