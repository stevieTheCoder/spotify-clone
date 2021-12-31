import { useRef } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useLongHover from "../hooks/useLongHover";
import PropTypes from "prop-types";
import { useSpotifyPrefetchPlaylist } from "../hooks/spotify";

interface Props {
  id: string;
  name: string;
}

const PlaylistName: React.FC<Props> = ({ id, name }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const [, setPlaylistId] = useRecoilState(playlistIdState);
  const prefetchPlaylist = useSpotifyPrefetchPlaylist();
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
