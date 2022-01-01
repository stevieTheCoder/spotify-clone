import PropTypes from "prop-types";
import { MouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  size?: number;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const PlayerButton: React.FC<Props> = ({ children, size = 5, onClick }) => {
  return (
    <div
      className={`w-${size} h-${size} transition duration-100 ease-out transform cursor-pointer hover:scale-125 hover:text-blue-500 `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

PlayerButton.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  onClick: PropTypes.func,
};

export default PlayerButton;
