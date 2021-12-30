import { TRPCError } from "@trpc/server";
import { z } from "zod";
import spotifyApi from "../../utils/spotify";
import { createRouter } from "./app";

export const deviceRouter = createRouter()
  .query("active-device", {
    async resolve() {
      const response = await spotifyApi.getMyDevices();

      const activeDevice = response.body.devices.find(
        (device) => device.is_active
      );

      if (activeDevice == null) {
        return null;
      }

      return { name: activeDevice.name, volume: activeDevice.volume_percent };
    },
  })
  .query("current-playback-state", {
    async resolve() {
      const response = await spotifyApi.getMyCurrentPlaybackState();
      if (response.statusCode === 204) {
        return { isPlaying: false };
      }
      return { isPlaying: response.body.is_playing };
    },
  })
  .mutation("volume", {
    input: z.object({ volume: z.number().min(0).max(100) }),
    async resolve(req) {
      return await spotifyApi.setVolume(req.input.volume);
    },
  })
  .mutation("play", {
    async resolve() {
      return await spotifyApi.play();
    },
  })
  .mutation("pause", {
    async resolve() {
      return await spotifyApi.pause();
    },
  });
