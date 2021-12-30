import { useCallback } from "react";
import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyGetCurrentlyPlaying = () => {
  const { spotifyApi } = useSpotify();

  const fetchCurrentPlayingTrack = useCallback(async () => {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    return response.body?.item?.id;
  }, [spotifyApi]);

  const queryPlayingTrack = useQuery(
    "currentlyPlayingTrackId",
    fetchCurrentPlayingTrack
  );

  return queryPlayingTrack;
};

export default useSpotifyGetCurrentlyPlaying;
