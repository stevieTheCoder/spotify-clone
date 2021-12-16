import Track from "./Track";

function Tracks({ playlist }) {
  {
    return (
      <div className="flex-col px-8 space-y-1 text-white pb-28">
        {playlist.tracks.items.map((track, i) => (
          <Track key={track.track.id} track={track.track} order={i} />
        ))}
      </div>
    );
  }
}

export default Tracks;
