import NextAuth from "next-auth";
import SpofityProvider from "next-auth/providers/spofity";
<<<<<<< HEAD
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1 hour as 3600
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefressAccessTokenErrro",
    };
  }
};
=======
>>>>>>> 5ad77e8e1f62fe7934ba11ad7e1b10a4623128e5

export default NextAuth({
  providers: [
    SpofityProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECET,
      authorization: LOGIN_URL,
    }),
  ],
<<<<<<< HEAD
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // we are handling expiry times in Milliseconds
        };
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, need to refresh
      return await refreshAccessToken(token);
    },
  },
=======
>>>>>>> 5ad77e8e1f62fe7934ba11ad7e1b10a4623128e5
});
