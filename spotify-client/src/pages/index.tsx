import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import spotifyApi from "../utils/spotify";
import PropTypes from "prop-types";
import { GetStaticProps } from "next";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter, createContext } from "@/server/router/app";

interface Props {
  featuredPlaylistId?: string;
}

const Home: React.FC<Props> = ({ featuredPlaylistId }) => {
  const [, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (featuredPlaylistId == null) return;
    setPlaylistId(featuredPlaylistId);
  }, [featuredPlaylistId, setPlaylistId]);

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

Home.propTypes = {
  featuredPlaylistId: PropTypes.string,
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
  });

  try {
    const credentialResponse = await spotifyApi.clientCredentialsGrant();

    if (credentialResponse.statusCode === 200) {
      console.log(
        "The access token expires in " + credentialResponse.body.expires_in
      );
      console.log(
        "The access token is " + credentialResponse.body.access_token
      );

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(credentialResponse.body.access_token);
    }
  } catch (err) {
    console.log("Something went wrong when retrieving an access token", err);
  }

  const fetchFeaturedPlaylistId = async () => {
    try {
      const response = await spotifyApi.getFeaturedPlaylists({
        limit: 1,
        offset: 0,
        country: "GB",
      });

      return response.body.playlists.items[0].id;
    } catch (err) {
      console.log("Something went wrong!", err);
    }
  };

  const featuredPlaylistId = await fetchFeaturedPlaylistId();

  if (featuredPlaylistId) {
    await ssg.fetchQuery("playlists.playlist-by-id", {
      playlistId: featuredPlaylistId,
    });
  }

  return {
    props: { trpcState: ssg.dehydrate(), featuredPlaylistId },
  };
};

export default Home;
