"use client";
import ProductCard from "@/components/productCard";
import { SearchComponent } from "@/components/searchComponent";

export default function Shop() {
  return (
    <div className="flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold mt-4">Página de Produtos</h1>
      <p className="text-lg text-gray-600 mb-10">
        Aqui você encontra os melhores produtos do mercado.
      </p>
      <div className="w-full max-w-7xl px-12">
        <SearchComponent />
      </div>
      <div className="flex flex-wrap justify-center mb-10 gap-4 max-w-7xl">
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
    </div>
  );
}
