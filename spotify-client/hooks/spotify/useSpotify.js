/* eslint-disable no-unused-vars */
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // If refresh access token fails, redirect user to login
    if (session.error === "RefreshAccessTokenError") {
      signIn();
    }

    spotifyApi.setAccessToken(session.accessToken);
  }, [session.accessToken, session.error]);

  return { spotifyApi };
};

export default useSpotify;
