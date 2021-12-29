import { ChevronDownIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import {MouseEvent} from "react";

interface Props {
  name: string,
  image: string,
  onClick: (event: MouseEvent<HTMLElement>) => void
}

const UserHeader: React.FC<Props> = ({ name, image, onClick }) => {
  return (
    <div
      className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
      onClick={onClick}
    >
      <img
        src={image}
        className="object-cover w-10 h-10 rounded-full"
        alt="user image"
      />
      <h2>{name}</h2>
      <ChevronDownIcon className="w-5 h-5" />
    </div>
  );
}

UserHeader.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserHeader;
