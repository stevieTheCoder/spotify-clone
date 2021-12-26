import useSpotify from "./useSpotify";

const useSpotifyPlayTrack = () => {
  const { spotifyApi } = useSpotify();

  const playSpotifyTrack = async (trackId, trackUri) => {
    try {
      await spotifyApi.play({
        uris: [trackUri],
      });
    } catch (err) {
      console.log("Something went wrong!", err);
    }
  };

  return { playSpotifyTrack };
};

export default useSpotifyPlayTrack;
