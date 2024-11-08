import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function ProductCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src="/produto1.jpg"
            alt="Imagem do produto"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold mb-2">PC Gamer</CardTitle>
        <p className="text-sm text-gray-600 mb-4">
          Este é um produto fantástico que vai revolucionar sua vida. Com
          características únicas e design inovador, é a escolha perfeita para
          você.
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
        <span className="text-2xl font-bold text-green-600">R$ 1.999,99</span>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Comprar
        </button>
      </CardFooter>
    </Card>
  );
}
