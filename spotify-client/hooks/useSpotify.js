import { useSession, signIn } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect } from "react";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token fails, redirect user to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      if (status === "authenticated") {
        spotifyApi.setAccessToken(session.accessToken);
        console.log("Set access token", session.accessToken);
      }
    }
  }, [session, status]);

  return spotifyApi;
}
