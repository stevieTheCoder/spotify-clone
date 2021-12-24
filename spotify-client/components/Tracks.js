import Track from "./Track";

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

export default Tracks;
