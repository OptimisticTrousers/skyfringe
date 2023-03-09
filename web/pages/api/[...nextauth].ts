import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // THe name to display on the sign in form (e.g. 'Sign in with...')
      id: "login",
      name: "Login",
      type: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either an object representing a user or a value
        // that is false/null if the credentials are invalid.
        // e.g. return {id: 1, name: "J Smith", email: "jsmith@example.com"}
        // You can also use the 'req' object to obtain additional parameters
        // (i.e., the request IP address)
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const { user } = await response.json();

        // If no error and we have user data, return it
        if (response.ok && user) {
          return user;
        }
        // Return null if user data could not be retrived
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  // Configure one or more authentication providers
  secret: "cats",
};

export default NextAuth(authOptions);
