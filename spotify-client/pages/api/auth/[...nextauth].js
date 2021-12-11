import NextAuth from "next-auth";
import SpofityProvider from "next-auth/providers/spofity";

export default NextAuth({
  providers: [
    SpofityProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECET,
      authorization: LOGIN_URL,
    }),
  ],
});
