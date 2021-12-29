import useSpotifyDevice from "../hooks/spotify/useSpotifyDevice";

const ActivateDevice: React.FC = () => {
  const {
    isIdle,
    isLoading,
    isError,
    error,
    data: activeDevice,
  } = useSpotifyDevice();

  if (isIdle || isLoading) return null;

  if (isError) return <div>Error {error}</div>;

  if (activeDevice)
    return (
      <p className="text-xs font-semibold text-gray-500 ">
        Device: {activeDevice.name}
      </p>
    );

  return (
    <p className="text-xs font-semibold text-red-500 ">No active device</p>
  );
};

export default ActivateDevice;
