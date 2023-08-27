import Carousel from "@/components/Carousel/Carousel";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import TopTracks from "@/components/TopTracks";
import { fetchCherryMusicTracks } from "../api/cherryMusic/track/service";
import { lastFmFetcher } from "../api/lastFm/fetcher";

export const dynamic = "force-dynamic";

async function Home() {
  const [todayTop50, topArtistsData] = await Promise.all([
    //debugging
    fetchCherryMusicTracks({ query: "top", count: 20 }),
    // fetchCherryMusicTracks({ query: "top" }),
    lastFmFetcher.fetchTopArtists(),
  ]);
  const topArtistsDataWithType = {
    type: "artist",
    items: topArtistsData.artists.artist,
  };

  return (
    <div className="grid-cols-4">
      <div className="carousel-container h-80 relative">
        <Carousel />
      </div>
      <TopTracks title="Today Top50" trackList={todayTop50} />

      <HorizontalTiles
        sectionTitle="Top Artists"
        arr={topArtistsDataWithType}
        isCircle
        nav
      />
      {/* <TopPlayLists /> */}
    </div>
  );
}
export default Home;
