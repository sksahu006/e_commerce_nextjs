import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"; 
import { prisma } from "@/lib/prisma";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      email:string;
      isAdmin: boolean;
    };
  }

  interface User {
    id: string;
    email:string,
    isAdmin: boolean;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Find user by email in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null; // No user found with this email
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          return null; // Invalid password
        }

        // Return the user object if authentication is successful
        return {
          id: user.id.toString(), // Convert to string
          email: user.email,
          name: user.username,
          isAdmin: user.isAdmin, 
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  pages: {
    signIn: "/app/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
};

export default authConfig;