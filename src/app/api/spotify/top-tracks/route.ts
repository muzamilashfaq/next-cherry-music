import { handleError, validateEnvVariable } from "@/lib/helpers";
import { SpotifyTrack, SpotifyTrackData } from "@/types/spotify/types";
import { NextRequest, NextResponse } from "next/server";
import { fetchSpotifyAccessToken } from "../service";

export async function GET(req: NextRequest, res: NextResponse) {
  const playlistId = req.nextUrl.searchParams.get("playlistid");

  if (!playlistId) {
    return NextResponse.error();
  }

  const spotifyData = await fetchSpotifyPlaylist(playlistId);
  return NextResponse.json(spotifyData);
}

const fetchSpotifyPlaylist = async (
  playlistId: string
): Promise<SpotifyTrackData[]> => {
  validateEnvVariable(
    process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL,
    "NEXT_PUBLIC_SPOTIFY_BASE_URL"
  );

  const token = await fetchSpotifyAccessToken();
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`
    );

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const trackData = data.items.map((item: SpotifyTrack) => {
      return {
        name: item.track.name,
        artist: { name: item.track.artists[0].name, mbid: "", url: "" },
        albumTitle: item.track.album.name,
        image: item.track.album.images.map((image) => {
          return {
            "#text": image.url,
            size: image.width,
          };
        }),
      };
    });
    return trackData;
  } catch (error) {
    handleError({ context: "Spotify API - Top Tracks Data", error });
    throw error;
  }
};
