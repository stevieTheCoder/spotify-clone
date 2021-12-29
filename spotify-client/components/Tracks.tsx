import Track from "./Track";
import PropTypes from "prop-types";

interface Props {
  tracks: any
}

const Tracks: React.FC<Props> = ({ tracks }) => {
  return (
    <div className="flex-col px-8 space-y-1 text-white pb-28">
      {tracks.items
        .filter((i: any) => i.track !== null)
        .map((item: any, i: any) => {
          return <Track key={item.track.id} track={item.track} order={i} />;
        })}
    </div>
  );
}

Tracks.propTypes = {
  tracks: PropTypes.object.isRequired,
};

export default Tracks;
