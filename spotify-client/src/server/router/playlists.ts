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
      const data = await (
        await spotifyApi.getPlaylist(req.input.playlistId)
      ).body;

      const tracks: {
        id: string;
        uri: string;
        albumImageSrc: string;
        name: string;
        artistName: string;
        albumName: string;
        duration: number;
      }[] = [];

      data.tracks.items.map((i) => {
        tracks.push({
          id: i.track.id,
          uri: i.track.uri,
          albumImageSrc: i.track.album.images[0].url,
          name: i.track.name,
          artistName: i.track.artists[0].name,
          albumName: i.track.album.name,
          duration: i.track.duration_ms,
        });
      });

      return {
        ImageSrc: data.images[0].url,
        name: data.name,
        tracks,
      };
    },
  });
