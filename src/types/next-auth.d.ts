import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string;
      createdAt: string;
      updatedAt: string;
    },
    token: string;
  }
}
