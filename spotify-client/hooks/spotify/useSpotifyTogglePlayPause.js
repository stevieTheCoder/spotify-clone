import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "./useSpotify";

const useSpotifyTogglePlayPause = () => {
  const { spotifyApi } = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId] = useRecoilState(currentTrackIdState);

  const togglePlayPause = async () => {
    try {
      const response = await spotifyApi.getMyCurrentPlaybackState(
        currentTrackId
      );
      setIsPlaying(response.body.is_playing);
    } catch (err) {
      console.log("Something went wrong!", err);
    }

    if (!isPlaying) {
      try {
        await spotifyApi.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    } else {
      try {
        await spotifyApi.pause();
        setIsPlaying(false);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    }
  };

  return { togglePlayPause };
};

export default useSpotifyTogglePlayPause;
