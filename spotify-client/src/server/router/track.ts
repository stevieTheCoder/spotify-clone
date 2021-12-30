import { z } from "zod";
import spotifyApi from "../../utils/spotify";
import { createRouter } from "./app";

export const trackRouter = createRouter()
  .query("currently-playing-id", {
    async resolve() {
      const response = await spotifyApi.getMyCurrentPlayingTrack();
      return { trackId: response.body.item?.id };
    },
  })
  .query("track-info", {
    input: z.object({
      trackId: z.string().nonempty(),
    }),
    async resolve(req) {
      const response = await spotifyApi.getTrack(req.input.trackId);
      return {
        trackId: response.body.id,
        albumSrc: response.body.album.images[0].url,
        artist: response.body.artists[0].name,
        name: response.body.name,
      };
    },
  })
  .mutation("play", {
    input: z.object({ trackUri: z.string(), trackId: z.string() }),
    async resolve(req) {
      return await spotifyApi.play({ uris: [req.input.trackUri] });
    },
  });
