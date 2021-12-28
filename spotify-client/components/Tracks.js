import Track from "./Track";
import PropTypes from "prop-types";

function Tracks({ tracks }) {
  {
    return (
      <div className="flex-col px-8 space-y-1 text-white pb-28">
        {tracks.items
          .filter((i) => i.track !== null)
          .map((item, i) => {
            return <Track key={item.track.id} track={item.track} order={i} />;
          })}
      </div>
    );
  }
}

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tracks;
