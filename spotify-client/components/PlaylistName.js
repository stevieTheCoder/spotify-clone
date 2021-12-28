import { useRef } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { useSpotifySelectedPlaylist } from "../hooks/spotify";
import useLongHover from "../hooks/useLongHover";
import PropTypes from "prop-types";

const PlaylistName = ({ id, name }) => {
  const elementRef = useRef();
  const [, setPlaylistId] = useRecoilState(playlistIdState);
  const { prefetchPlaylist } = useSpotifySelectedPlaylist();
  useLongHover(elementRef, async () => await prefetchPlaylist(id));

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

PlaylistName.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlaylistName;