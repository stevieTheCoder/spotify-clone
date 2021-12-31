import { signIn } from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "/public/spotify.png";

export const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      <div className="mb-5">
        <Image src={spotifyLogo} alt="spotify logo"></Image>
      </div>

      <button
        className="w-52 bg-[#18D860] text-white p-5 rounded-full"
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
