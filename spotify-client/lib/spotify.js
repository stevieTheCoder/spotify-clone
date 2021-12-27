import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(", ");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };

export const fetchFeaturedPlaylistId = async () => {
  try {
    const response = await spotifyApi.getFeaturedPlaylists({
      limit: 1,
      offset: 0,
      country: "GB",
    });

    return response.body.playlists.items[0].id;
  } catch (err) {
    console.log("Something went wrong!", err);
  }
};

export const fetchPlaylist = async (id) => {
  const response = await spotifyApi.getPlaylist(id);
  return response.body;
};
