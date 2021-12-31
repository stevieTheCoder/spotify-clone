import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "/public/spotify.png";

type Props = {
  onClick: () => void;
};

const UserHeader: React.FC<Props> = ({ onClick }) => {
  const { data: session } = useSession();

  return (
    <div
      className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
      onClick={onClick}
    >
      {" "}
      {session?.user?.image ? (
        <div className="w-10 h-10">
          <Image
            src={session.user.image}
            width={40}
            height={40}
            objectFit="cover"
            className="rounded-full"
            alt="user image"
          />
        </div>
      ) : (
        <Image
          src={spotifyLogo}
          width={40}
          height={40}
          objectFit="cover"
          className="rounded-full"
          alt="spotify logo"
        />
      )}
      <h2>{session?.user?.name}</h2>
      <ChevronDownIcon className="w-5 h-5" />
    </div>
  );
};

export default UserHeader;
