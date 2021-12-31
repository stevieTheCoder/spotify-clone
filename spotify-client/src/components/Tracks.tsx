import Track from "./Track";
import { inferQueryResponse } from "@/utils/trpc";

type TrackFromServer = inferQueryResponse<"playlists.playlist-by-id">;
type TracksType = TrackFromServer["tracks"];

type Props = {
  tracks: TracksType;
};

const Tracks: React.FC<Props> = ({ tracks }) => {
  return (
    <div className="flex-col px-8 space-y-1 text-white pb-28">
      {tracks.map((track, i: number) => {
        return <Track key={track.id} track={track} order={i} />;
      })}
    </div>
  );
};

export default Tracks;
