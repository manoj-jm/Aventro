import db from "@/../db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your.email@example.com",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your username",
        },
        password: { label: "Password", type: "password" },
      },
      // Adding proper type
      async authorize(
        credentials:
          | Record<"email" | "username" | "password", string>
          | undefined
      ) {
        if (
          !credentials?.password ||
          (!credentials?.email && !credentials?.username)
        ) {
          return null;
        }

        const existingUser = await db.user.findFirst({
          where: {
            OR: [
              { email: credentials.email || "" },
              { username: credentials.username || "" },
            ],
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              email: existingUser.email,
              username: existingUser.username,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              email: credentials.email || "",
              username: credentials.username || "",
              password: await bcrypt.hash(credentials.password, 10),
            },
          });

          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
  },
};
