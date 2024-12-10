import Link from 'next/link';
import { FaHome, FaSearch, FaShoppingCart, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { IoStorefront } from "react-icons/io5";


export default function NavBar() {
    return (
        <nav className="bg-gray-500 w-full p-6 fixed top-0 left-0 z-10">
            <div className="flex justify-between items-center w-full">
                {/* Esquerda */}
                <div className="flex items-center">
                    <Link href="/" className="text-white text-2xl">
                        <FaHome />
                    </Link>
                </div>

                {/* Centro */}
                <div className="flex items-center justify-center flex-1">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full p-2 pl-10 pr-4 rounded-lg bg-gray-700 text-white placeholder-white focus:outline-none"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                    </div>
                </div>

                {/* Direito */}
                <div className="flex items-center space-x-6">
                    <Link href="/login" className="text-white flex items-center">
                        <FaSignInAlt className="text-white text-2xl" />
                        <span className="ml-2">Entrar</span>
                    </Link>

                    <Link href="/register" className="text-white flex items-center">
                        <FaUserPlus className="text-white text-2xl" />
                        <span className="ml-2">Cadastro</span>
                    </Link>

                    <Link href="/shop/user" className="text-white flex items-center">
                        <IoStorefront className="text-white text-2xl" />
                        <span className="ml-2">Loja</span>
                    </Link>

                    <Link href="/product/list" className="text-white flex items-center">
                        <FaShoppingCart className="text-white text-2xl" />
                        <span className="ml-2">Meus Produtos</span>
                    </Link>

                </div>
            </div>
        </nav>
    );
}