import useSpotifyDevices from "../hooks/spotify/useSpotifyDevices";

const ActivateDevice = () => {
  const {
    isIdle,
    isLoading,
    isError,
    error,
    data: devices,
  } = useSpotifyDevices();

  if (isIdle || isLoading) return null;

  if (isError) return <div>Error {error}</div>;

  if (devices.length !== 0) return null;

  return (
    <div className="fixed top-0 flex items-center justify-center w-full bg-yellow-300 min-h-10">
      <p className="font-bold">Please activate a spotify web player</p>
    </div>
  );
};

export default ActivateDevice;
