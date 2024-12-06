import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const baseUrl = "http://localhost:3000";

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img src={`${baseUrl}/${product.banner}`} alt={product.name} />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold mb-2">{product.name}</CardTitle>
        <p className="inter text-sm text-gray-600 mb-4">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
        <span className="text-2xl font-bold text-green-600">
          {product.price}
        </span>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Comprar
        </button>
      </CardFooter>
    </Card>
  );
}
