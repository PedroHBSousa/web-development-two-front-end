import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";
import {
  FaShippingFast,
  FaShieldAlt,
  FaStar,
  FaCreditCard,
} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 w-full">
        <div
          className="w-full h-[300px] sm:h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://getbranded.com/cdn/shop/collections/Generic_659d0ad2-1977-40e9-8691-35dd072cf0db.jpg?v=1671198217')",
          }}
        >
          <div className="flex items-center justify-center flex-col bg-black bg-opacity-50 text-white h-full">
            <h1 className="text-3xl font-bold mb-4">Venda seus produtos</h1>
            <Link href="/product/create">
              <span className="inline-block px-6 py-2 bg-green-500 hover:bg-green-600 rounded text-lg text-white text-center">
                Anunciar agora
              </span>
            </Link>
          </div>
        </div>

        <section className="py-8">
          <div className="container mx-auto flex flex-wrap justify-center text-center">
            <div className="w-1/2 sm:w-1/4 p-4">
              <div className="bg-green-100 text-green-600 p-4 rounded-full mb-2 flex justify-center">
                <FaShippingFast size={24} />
              </div>
              <p className="font-medium">Frete Grátis</p>
            </div>
            <div className="w-1/2 sm:w-1/4 p-4">
              <div className="bg-green-100 text-green-600 p-4 rounded-full mb-2 flex justify-center">
                <FaShieldAlt size={24} />
              </div>
              <p className="font-medium">Compra Segura</p>
            </div>
            <div className="w-1/2 sm:w-1/4 p-4">
              <div className="bg-green-100 text-green-600 p-4 rounded-full mb-2 flex justify-center">
                <FaStar size={24} />
              </div>
              <p className="font-medium">Qualidade Garantida</p>
            </div>
            <div className="w-1/2 sm:w-1/4 p-4">
              <div className="bg-green-100 text-green-600 p-4 rounded-full mb-2 flex justify-center">
                <FaCreditCard size={24} />
              </div>
              <p className="font-medium">Parcelamento Fácil</p>
            </div>
          </div>
        </section>

        <section className="py-8 mb-40">
          <h2 className="text-xl font-bold text-center mb-6">
            O que nossos clientes dizem
          </h2>
          <div className="container mx-auto flex flex-col sm:flex-row justify-around">
            <div className="text-center p-4 bg-white shadow rounded mb-4 sm:mb-0">
              <p className="text-gray-600 italic">
                Ótima experiência de compra!
              </p>
              <p className="mt-2 text-sm font-medium">- Cliente A</p>
            </div>
            <div className="text-center p-4 bg-white shadow rounded">
              <p className="text-gray-600 italic">
                Entrega rápida e produtos de qualidade.
              </p>
              <p className="mt-2 text-sm font-medium">- Cliente B</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
