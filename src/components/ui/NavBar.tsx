"use client";

import Link from "next/link";
import {
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { signOut } from "next-auth/react";
import { IoStorefront, IoExitOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-gray-500 w-full p-6 fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center w-full">
        {/* Esquerda */}
        <div className="flex items-center">
          <Link href="/" className="text-white text-2xl">
            <FaHome />
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {!session ? (
            <Link href="/login" className="text-white flex items-center">
              <FaSignInAlt className="text-white text-2xl" />
              <span className="ml-2">Entrar</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-6">
              <span className="text-white">
                Olá, {session?.user.user.fullName}
              </span>

              <Link
                href={`/shop/${session?.user.user.id}`}
                className="text-white flex items-center"
              >
                <IoStorefront className="text-white text-2xl" />
                <span className="ml-2">Minha Loja</span>
              </Link>

              <Link
                href="/product/list"
                className="text-white flex items-center"
              >
                <FaShoppingCart className="text-white text-2xl" />
                <span className="ml-2">Meus Produtos</span>
              </Link>

              <Link
                href=""
                className="text-white flex items-center"
                onClick={() => signOut()}
              >
                <IoExitOutline className="text-white text-2xl" />
                <span className="ml-2">Sair</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
