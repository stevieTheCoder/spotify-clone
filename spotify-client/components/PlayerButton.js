function PlayerButton({ children, size, callback }) {
  return (
    <div
      className={`w-${size ?? 5} h-${
        size ?? 5
      } transition duration-100 ease-out transform cursor-pointer hover:scale-125`}
      onClick={callback}
    >
      {children}
    </div>
  );
}

export default PlayerButton;
