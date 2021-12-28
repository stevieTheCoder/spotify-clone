import PropTypes from "prop-types";

function PlayerButton({ children, size, callback }) {
  return (
    <div
      className={`w-${size ?? 5} h-${
        size ?? 5
      } transition duration-100 ease-out transform cursor-pointer hover:scale-125 hover:text-blue-500 `}
      onClick={callback}
    >
      {children}
    </div>
  );
}

PlayerButton.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  callback: PropTypes.func,
};

export default PlayerButton;
