import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    Credentials({
      email: {
        label: "Email",
        type: "text",
        placeholder: "Enter your email",
        required: true,
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        required: true,
      },
    }),
  ],
}

export default NextAuth(authOptions)