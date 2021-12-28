import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import spotifyApi, {
  fetchFeaturedPlaylistId,
  fetchPlaylist,
} from "../lib/spotify";
import PropTypes from "prop-types";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  spotifyApi.setAccessToken(session.accessToken);

  const featuredPlaylistId = await fetchFeaturedPlaylistId();

  // Data will be available client side
  await queryClient.prefetchQuery(
    ["playlists", featuredPlaylistId],
    () => fetchPlaylist(featuredPlaylistId),
    {
      staleTime: 60000,
    }
  );

  return {
    props: { dehydratedState: dehydrate(queryClient), featuredPlaylistId },
  };
}

export default function Home({ featuredPlaylistId }) {
  const [, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
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
}

Home.propTypes = {
  featuredPlaylistId: PropTypes.string,
};

Home.auth = true;
