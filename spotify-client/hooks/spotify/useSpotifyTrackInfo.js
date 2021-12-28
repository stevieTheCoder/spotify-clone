import useSpotify from "./useSpotify";
import { useQuery } from "react-query";
import useSpotifyGetCurrentlyPlaying from "./useSpotifyGetCurrentlyPlaying";
import { useCallback } from "react";

const useSpotifyTrackInfo = () => {
  const { spotifyApi } = useSpotify();
  const { data: currentlyPlayingTrackId } = useSpotifyGetCurrentlyPlaying();

  const fetchTrackInfo = useCallback(
    async (id) => {
      const response = await spotifyApi.getTrack(id);
      return {
        trackId: response.body.id,
        albumSrc: response.body.album.images[0].url,
        artist: response.body.artists[0].name,
        name: response.body.name,
      };
    },
    [spotifyApi]
  );

  const queryTrackInfo = useQuery(
    ["trackInfo", currentlyPlayingTrackId],
    () => fetchTrackInfo(currentlyPlayingTrackId),
    {
      enabled: !!currentlyPlayingTrackId,
      staleTime: 60000,
    }
  );

  return queryTrackInfo;
};

export default useSpotifyTrackInfo;
