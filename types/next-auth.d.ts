import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: number;
    uuid?: string;
    email?: string;
    fullname?: string;
    role?: "SUPERADMIN" | "ADMIN";
    phone?: string;
    image_url?: string;
    access_token?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id?: number;
      uuid?: string;
      email?: string;
      fullname?: string;
      role?: "SUPERADMIN" | "ADMIN";
      phone?: string;
      image_url?: string;
      access_token?: string;
    } & DefaultSession["user"];
    access_token?: string;
  }
}
