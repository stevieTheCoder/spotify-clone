import { ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import PropTypes from "prop-types";

interface Props {
  name: string;
  image: string;
  onClick: () => void;
}

const UserHeader: React.FC<Props> = ({ name, image, onClick }) => {
  return (
    <div
      className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
      onClick={onClick}
    >
      <div className="w-10 h-10">
        <Image
          src={image}
          width={40}
          height={40}
          objectFit="cover"
          className="rounded-full"
          alt="user image"
        />
      </div>
      <h2>{name}</h2>
      <ChevronDownIcon className="w-5 h-5" />
    </div>
  );
};

UserHeader.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserHeader;
