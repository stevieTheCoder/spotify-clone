import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "./useSpotify";

const useSpotifyPlayTrack = () => {
  const { spotifyApi } = useSpotify();
  const [, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [, setIsPlaying] = useRecoilState(isPlayingState);

  const playSpotifyTrack = async (trackId, trackUri) => {
    try {
      await spotifyApi.play({
        uris: [trackUri],
      });
      setIsPlaying(true);
      setCurrentTrackId(trackId);
    } catch (err) {
      console.log("Something went wrong!", err);
    }
  };

  return { playSpotifyTrack };
};

export default useSpotifyPlayTrack;
