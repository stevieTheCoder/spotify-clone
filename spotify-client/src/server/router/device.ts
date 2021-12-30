import { TRPCError } from "@trpc/server";
import spotifyApi from "../../utils/spotify";
import { createRouter } from "./app";

export const deviceRouter = createRouter().query("active-device", {
  async resolve() {
    const response = await spotifyApi.getMyDevices();

    const activeDevice = response.body.devices.find(
      (device) => device.is_active
    );

    if (activeDevice == null) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return { name: activeDevice?.name, volume: activeDevice?.volume_percent };
  },
});
