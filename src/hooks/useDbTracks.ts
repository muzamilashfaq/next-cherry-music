import { Track } from "@/lib/server/database.types";
import fetchFromSupabase from "@/lib/server/fetchFromSupabase";
import { useEffect, useState } from "react";
import { handleError, isDataOld } from "../lib/helpers";
import saveTracksToSupabase from "../lib/server/saveTracksToSupabase";
import useLastFetchTime from "./supabase/useLastFetchTime";

export interface UseDbTracksProps {
  trackCategory:
    | "topTracks"
    | "artistTopTracks"
    | "tagTopTracks"
    | "albumTracks";
  query: "top" | "artist-top" | "tag-top" | "album-tracks";
  artist?: string;
  album?: string;
  tag?: string;
  count?: number;
}

function useDbTracks({
  trackCategory,
  query,
  artist,
  album,
  tag,
  count,
}: UseDbTracksProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [reqTracks, setReqTracks] = useState<Track[]>([]);
  const { lastFetchTime, setLastFetchTime, isLastFetchStateLoading } =
    useLastFetchTime(trackCategory);

  const fetchReqTracks = async () => {
    const reqTracksResponse = await fetch(
      `/api/cherryMusic/track?query=${query}&artist=${artist}&album=${album}&tag=${tag}`
    );
    if (!reqTracksResponse.ok) {
      throw new Error(reqTracksResponse.statusText);
    }
    const reqTracksList = await reqTracksResponse.json();
    console.log("reqTracksList", reqTracksList);
    return reqTracksList.slice(0, count);
  };

  const saveTracksToDB = async (tracks: Track[]) => {
    await saveTracksToSupabase({ tracks, setIsSaved });
    setIsSaved(true);
  };

  const fetchDataFromDB = async (tracksToFetch: Track[]) => {
    const dataFromDB = await fetchFromSupabase(tracksToFetch);
    setReqTracks(dataFromDB);
  };

  useEffect(() => {
    const fetchAndManageData = async () => {
      setIsLoading(true);
      try {
        if (!isLastFetchStateLoading) {
          const fetchedTracks = await fetchReqTracks();
          if (
            trackCategory !== "topTracks" ||
            !lastFetchTime ||
            isDataOld(lastFetchTime)
          ) {
            await saveTracksToDB(fetchedTracks);
            setLastFetchTime(new Date());
          }
          await fetchDataFromDB(fetchedTracks);
        }
      } catch (error) {
        handleError({ context: "Fetching reqTracks:", error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndManageData();
  }, [isLastFetchStateLoading]);

  return { isSaved, isLoading, reqTracks };
}

export default useDbTracks;
