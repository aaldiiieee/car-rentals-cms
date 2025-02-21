import { NextAuthOptions } from "next-auth";
import { User } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import callApiUrl from "@/lib/api";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        mub_email: { label: "Email", type: "email", placeholder: "example@example.com" },
        mub_password: { label: "Password", type: "password", placeholder: "*********" },
      },

      async authorize(credentials) {
        if (!credentials?.mub_email || !credentials.mub_password) {
          return null;
        }

        try {
          const res = await callApiUrl.post("/users/backoffice/login", credentials);
          const user = res.data.data;
          const token = res.data.token;

          if (token) {
            return {
              id: user.mub_id,
              uuid: user.mub_uuid,
              name: user.mub_full_name,
              email: user.mub_email,
              role: user.mub_role,
              access_token: token,
            } as User;
          }

          return null;
        } catch (error) {
          console.log(error, "error in auth");
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 86400,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.uuid = user.uuid;
        token.name = user.name;
        token.email = user.email;
        token.access_token = user.access_token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as number,
        uuid: token.uuid as string,
        name: token.name as string,
        email: token.email as string,
      };
      session.access_token = token.access_token as string;
      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? "/dashboard" : baseUrl;
    // },
  },
  pages: {
    signIn: "/auth/login",
  },
};
