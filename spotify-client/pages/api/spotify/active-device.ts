import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import spotifyApi from "../../../lib/spotify";

const secret = process.env.JWT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret,
  });

  if (token) {
    spotifyApi.setAccessToken(token.accessToken);

    const response = await spotifyApi.getMyDevices();

    const activeDevice = response.body.devices.find(
      (device) => device.is_active
    );

    if (activeDevice) {
      res
        .status(200)
        .json({ name: activeDevice.name, volume: activeDevice.volume_percent });
      res.end();
    }

    res.status(204);
    res.end();
  }

  // Not authorized
  res.status(404);
  res.end();
};

export default handler;
