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
    <div className="w-full min-h-full overflow-hidden bg-black">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-12">
        <Sidebar />
        <Center />
      </main>

      <div className="fixed bottom-0 w-full">
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
    await ssg.fetchQuery("playlists.playlist-by-id", {
      playlistId: featuredPlaylistId,
    });
  }

  return {
    props: { trpcState: ssg.dehydrate(), featuredPlaylistId },
    revalidate: 60 * 60, // 1 hour
  };
};

export default Home;
