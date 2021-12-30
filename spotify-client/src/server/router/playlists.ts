import spotifyApi from "@/utils/spotify";
import { z } from "zod";
import { createRouter } from "./app";

export const playlistsRouter = createRouter()
  .query("user-playlists", {
    async resolve() {
      const response = await spotifyApi.getUserPlaylists();
      return response.body.items;
    },
  })
  .query("playlist-by-id", {
    input: z.object({ playlistId: z.string() }),
    async resolve(req) {
      const response = await spotifyApi.getPlaylist(req.input.playlistId);
      return response.body;
    },
  });
