import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import spotifyApi from "../../../lib/spotify"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req});

    if (session === null) return res.status(401);

    spotifyApi.setAccessToken(session.accessToken)

    if (session){
        const response = await spotifyApi.getMyDevices();
        const activeDevice = response.body.devices.find((device) => device.is_active);
        if (activeDevice){
            return res.status(200).json({name: activeDevice.name, volume: activeDevice.volume_percent});
        }
    } 
    return res.status(204);
}

export default handler
