import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/api";

const nextAuthOptions: NextAuthOptions = {
  secret: 'process.env.NEXTAUTH_SECRET',
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Credenciais inválidas.");
          }

          const response = await api.post("/authenticate", {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status !== 201) {
            throw new Error("Login falhou, credenciais incorretas.");
          }

          const user = response.data.user;
          const token = response.data.token;

          if (!user || !user.id) {
            throw new Error("Usuário não encontrado.");
          }

          return { user, token }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
