import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 w-full">
        {/* Banner com imagem de fundo */}
        <div
          className="w-full h-[300px] sm:h-[400px] bg-cover bg-center mt-[80px]"
          style={{
            backgroundImage: "url('https://getbranded.com/cdn/shop/collections/Generic_659d0ad2-1977-40e9-8691-35dd072cf0db.jpg?v=1671198217')"
          }}
        >
          <div className="flex items-center justify-center">
            <p>Conteudo massa</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
