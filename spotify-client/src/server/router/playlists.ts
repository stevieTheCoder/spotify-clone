import spotifyApi from "@/utils/spotify";
import { z } from "zod";
import { createRouter } from "./app";

export const playlistsRouter = createRouter()
  .query("user-playlists", {
    async resolve() {
      const response = await spotifyApi.getUserPlaylists();

      const userPlaylists = response.body.items.map((i) => ({
        id: i.id,
        name: i.name,
      }));

      return userPlaylists;
    },
  })
  .query("playlist-by-id", {
    input: z.object({ playlistId: z.string() }),
    async resolve(req) {
      const data = await (
        await spotifyApi.getPlaylist(req.input.playlistId)
      ).body;

      const tracks = data.tracks.items.map((i) => ({
        id: i.track.id,
        uri: i.track.uri,
        albumImageSrc: i.track.album.images?.[0]?.url ?? data.images[0].url, // Default to playlist image
        name: i.track.name,
        artistName: i.track.artists[0].name,
        albumName: i.track.album.name,
        duration: i.track.duration_ms,
      }));

      return {
        ImageSrc: data.images[0].url,
        name: data.name,
        tracks,
      };
    },
  });
