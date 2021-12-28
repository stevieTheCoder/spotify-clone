import { useRef } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { useSpotifySelectedPlaylist } from "../hooks/spotify";
import useLongHover from "../hooks/useLongHover";

const PlaylistName = ({ id, name }) => {
  const elementRef = useRef();
  const [, setPlaylistId] = useRecoilState(playlistIdState);
  const { prefetchPlaylist } = useSpotifySelectedPlaylist();
  useLongHover(elementRef, () => prefetchPlaylist(id));

  return (
    <p
      ref={elementRef}
      className="cursor-pointer hover:text-white"
      onClick={() => setPlaylistId(id)}
    >
      {name}
    </p>
  );
};

export default PlaylistName;
