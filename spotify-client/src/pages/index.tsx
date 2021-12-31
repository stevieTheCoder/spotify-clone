import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import {
  fetchFeaturedPlaylistId,
  signInSpotifyClientCredentialsFlow,
} from "../utils/spotify";
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

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
  });

  await signInSpotifyClientCredentialsFlow();

  const featuredPlaylistId = await fetchFeaturedPlaylistId();

  if (featuredPlaylistId) {
    await ssg.prefetchQuery("playlists.playlist-by-id", {
      playlistId: featuredPlaylistId,
    });
  }

  return {
    props: { trpcState: ssg.dehydrate(), featuredPlaylistId },
  };
};

export default Home;
