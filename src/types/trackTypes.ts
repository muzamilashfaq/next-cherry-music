type Streamable = { "#text": string; fulltrack: string };
export type Artist = { name: string; mbid: string; url: string };
type AlbumImage = { "#text": string; size: string };

export interface LastFmTrack {
  "@attr"?: {
    rank: string;
  };
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: { "#text": string; fulltrack: string };
  artist: Artist;
  albumTitle?: string;
  image: AlbumImage[];
}

export interface LastFmTrackDetails {
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: Streamable;
  artist: Artist;
  image: AlbumImage[];
}

export interface LastFmArtistInfo {
  artist: {
    name: string;
    mbid: string;
    url: string;
    image: string[];
    streamable: string;
    ontour: string;
    stats: { listeners: string; playcount: string };
    similar: { artist: Artist[] };
    tags: { tag: { name: string; url: string }[] };
    bio: {
      links: { link: { "#text": string; rel: string; href: string }[] };
      published: string;
      summary: string;
    };
  };
}

export interface SpotifyBestMatchArtistInfo {
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface LastFmAlbumInfo {
  artist: string;
  image: AlbumImage[];
  listeners: string;
  mbid: string;
  name: string;
  playcount: string;
  tags: { tag: { name: string; url: string }[] };
  tracks: { track: LastFmTrack[] };
  url: string;
  wiki: { published: string; summary: string };
}

export interface AlbumTrack {
  "@attr"?: {
    rank: string;
  };
  name: string;
  duration: string;
  mbid: string;
  url: string;
  streamable: { "#text": string; fulltrack: string };
  artist: Artist;
}

export interface LastFmArtists {
  artists: {
    artist: Artist[];
  };
}

export interface ArtistDetail {
  name: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  image: AlbumImage[];
  streamable: string;
}

("use client");
import useArtistImgUrl from "@/hooks/useArtistImgUrl";
import { ArtistDetail } from "@/types/trackTypes";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface EnrichedArtist extends ArtistDetail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  imgUrl?: string;
}

function BubbleChart({
  arr,
}: {
  arr: { type: string; items: ArtistDetail[] };
}) {
  const { artistImgUrls, loading } = useArtistImgUrl(arr.items);
  const chartRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", 800)
      .attr("height", 600);

    const maxListeners = d3.max(arr.items, (d) => Number(d.listeners));

    const sizeScale = d3
      .scaleLinear()
      .domain([0, maxListeners as number])
      .range([30, 100]);

    const enrichedArtists = arr.items.map((artist, index) => ({
      ...artist,
      x: Math.random() * 800,
      y: Math.random() * 600,
      vx: 0,
      vy: 0,
      imgUrl: artistImgUrls.get(artist.name),
    }));

    const defs = svg.append("defs");
    enrichedArtists.forEach((artist, index) => {
      const imageUrl = artistImgUrls.get(artist.name);
      const pattern = defs
        .append("pattern")
        .attr("id", `artist-${index}`)
        .attr("width", 1)
        .attr("height", 1);

      pattern
        .append("image")
        .attr("href", imageUrl || "images/default_band.png")
        .attr("width", sizeScale(Number(artist.listeners)) * 2)
        .attr("height", sizeScale(Number(artist.listeners)) * 2);
    });
    d3.forceSimulation(enrichedArtists)
      .force("x", d3.forceX(800 / 2).strength(0.05))
      .force("y", d3.forceY(600 / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide(
          (d: EnrichedArtist) => sizeScale(Number(d.listeners)) + 1
        )
      )
      .on("tick", () => {
        circles
          .attr("cx", (d: EnrichedArtist) => d.x)
          .attr("cy", (d: EnrichedArtist) => d.y);
      });

    const circles = svg
      .selectAll("circle")
      .data(enrichedArtists)
      .enter()
      .append("circle")
      .attr("cx", (d: EnrichedArtist) => d.x)
      .attr("cy", (d: EnrichedArtist) => d.y)
      .attr("r", (d) => sizeScale(Number(d.listeners)))
      .style("fill", (d, i) => `url(#artist-${i})`)
      .on("mouseover", function (d, i) {
        d3.select(this).attr("opacity", 0.7);
      })
      .on("mouseout", function (d, i) {
        d3.select(this).attr("opacity", 1);
      });

    svg
      .selectAll("text")
      .data(enrichedArtists)
      .enter()
      .append("text")
      .attr("x", (d: EnrichedArtist) => d.x)
      .attr("y", (d: EnrichedArtist) => d.y)
      .text((d) => d.name)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle");

    // The rest of the code for the simulation and rendering remains unchanged...
  }, [arr.items, artistImgUrls, loading]);

  return <div ref={chartRef}></div>;
}

export default BubbleChart;
