import { ChevronDownIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";

function UserHeader({ name, image, callback }) {
  return (
    <div
      className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
      onClick={callback}
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
  callback: PropTypes.func,
};

export default UserHeader;
