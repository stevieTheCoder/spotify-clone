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
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return { name: activeDevice.name, volume: activeDevice.volume_percent };
    },
  })
  .mutation("volume", {
    input: z.object({ volume: z.number().min(0).max(100) }),
    async resolve(req) {
      return await spotifyApi.setVolume(req.input.volume);
    },
  });
