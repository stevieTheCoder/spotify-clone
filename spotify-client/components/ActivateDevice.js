import useSpotifyDevice from "../hooks/spotify/useSpotifyDevice";

const ActivateDevice = () => {
  const {
    isIdle,
    isLoading,
    isError,
    error,
    data: activeDevice,
  } = useSpotifyDevice();

  if (isIdle || isLoading) return null;

  if (isError) return <div>Error {error}</div>;

  if (!!activeDevice)
    return (
      <p className="text-xs font-semibold text-gray-500 ">
        Device: {activeDevice.name}
      </p>
    );

  return (
    <p className="text-xs font-semibold text-gray-500 ">
      No active session, play a song on one of your devices
    </p>
  );
};

export default ActivateDevice;
