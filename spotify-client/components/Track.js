import millisecondsToMinutesAndSeconds from "../lib/time";

function Track({ order, track }) {
  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <div>
          <img className="w-10 h-10" src={track.album.images[0]?.url} />
        </div>
        <div>
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0 ">
        <p className="hidden md:inline">{track.album.name}</p>
        <p>{millisecondsToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Track;
