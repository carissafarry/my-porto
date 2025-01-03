import axios from 'axios';
import { NextResponse } from 'next/server';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = process.env;

const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

interface SpotifyData {
  is_playing: boolean;
  item: {
    name: string;
    album: {
      name: string;
      artists: Array<{ name: string }>;
      images: [{ url: string }];
    };
    external_urls: {
      spotify: string;
    };
  };
  currently_playing_type: string;
}

let cachedAccessToken: string | null = null;
let tokenExpirationTime: number | null = null;
const getAccessToken = async () => {
  if (
    cachedAccessToken &&
    tokenExpirationTime &&
    Date.now() < tokenExpirationTime
  ) {
    return cachedAccessToken;
  }

  try {
    const res = await axios.post<{
      access_token: string;
      token_type: string;
      expires_in: number;
    }>(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    cachedAccessToken = res.data.access_token;
    tokenExpirationTime = Date.now() + Number(res.data.expires_in) * 1000; // Expires in `expires_in` seconds
    return cachedAccessToken;
  } catch (error: any) {
    console.error(
      'Error fetching access token:',
      error.response?.data || error.message
    );
    throw error;
  }
};

const getNowPlaying = async () => {
  try {
    const accessToken = await getAccessToken();

    const res = await axios.get<SpotifyData>(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status !== 200) {
      return null; // No song playing or other error
    }
    return res;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.warn('Spotify rate limit reached: Ignoring this request.');
      return null;
    }

    console.error(
      'Error fetching now playing data:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const GET = async () => {
  const res = await getNowPlaying();
  let response: Response | void;

  if (
    !res ||
    res.status === 204 ||
    res.status > 400 ||
    res.data.currently_playing_type !== 'track'
  ) {
    // ? s-maxage=180 because song usually lasts 3 minutes
    response = NextResponse.json({ isPlaying: false }, { status: 200 });
    (response as Response).headers.set(
      'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate'
    );
    return response;
  }

  const data = {
    isPlaying: res.data.is_playing,
    title: res.data.item.name,
    album: res.data.item.album.name,
    artist: res.data.item.album.artists.map((artist) => artist.name).join(', '),
    albumImageUrl: res.data.item.album.images[0].url,
    songUrl: res.data.item.external_urls.spotify,
  };

  response = NextResponse.json(data, { status: 200 });
  (response as Response).headers.set(
    'Cache-Control',
    'no-cache, no-store, max-age=0, must-revalidate'
  );
  return response;
};
