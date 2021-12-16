function Tracks({ playlist }) {
  {
    return (
      <div className="text-white">
        {playlist.tracks.items.map((track) => (
          <div key={track.track.id}>{track.track.name}</div>
        ))}
      </div>
    );
  }
}

export default Tracks;
