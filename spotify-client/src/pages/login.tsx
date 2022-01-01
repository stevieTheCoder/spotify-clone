import { signIn } from "next-auth/react";
import Image from "next/image";

import spotifyLogo from "/public/spotify.png";

export const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full bg-black ">
      <div className="mb-5">
        <Image src={spotifyLogo} alt="spotify logo"></Image>
      </div>

      <button
        className="p-5 text-white rounded-full w-52 bg-spotifyGreen"
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
