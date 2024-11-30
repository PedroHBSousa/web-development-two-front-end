"use client";
import React from "react";
import ProductCard from "@/components/productCard";
import { SearchComponent } from "@/components/searchComponent";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

interface Props {
  params: Promise<{ user: string }>;
}

export default function Shop({ params }: Props) {
  const unwrappedParams = React.use(params);
  const user = unwrappedParams?.user;
  return (
    <div className="flex flex-col items-center justify-start">
      <NavBar/>
      <h1 className="text-4xl font-bold flex-1 mt-40">Página de Produtos de {user}</h1>
      <p className="text-lg text-gray-600 mb-10">
        Aqui você encontra os melhores produtos do mercado.
      </p>
      <div className="w-full max-w-7xl px-12">
        <SearchComponent />
      </div>
      <div className="flex flex-wrap justify-center gap-4 max-w-7xl mb-40">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Footer/>
    </div>
  );
}
