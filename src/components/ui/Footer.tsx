import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white fixed bottom-0 py-8 w-full">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          {/* Links de navegação */}
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-gray-400">Sobre</Link>
            <Link href="/contact" className="hover:text-gray-400">Contato</Link>
            <Link href="/privacy" className="hover:text-gray-400">Privacidade</Link>
            <Link href="/terms" className="hover:text-gray-400">Termos de Uso</Link>
          </div>

          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-pink-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl hover:text-blue-700" />
            </a>
          </div>
        </div>

        <div className="text-center text-sm">
          <p>&copy; 2024 MeuSite. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
