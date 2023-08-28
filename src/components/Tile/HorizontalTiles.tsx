"use client";

import useArtistImgUrl from "@/hooks/useArtistImgUrl";
import { Tiles } from "@/styles/Artist/Artist";
import { SectionGridContainer, SectionTitle } from "@/styles/Section";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import SectionNavigator from "../SectionNavigator";
import Tile from "./Tile";
import TileSkeleton from "./TileSkeleton";
import { ItemProps, arrWithType } from "@/types/itemTypes";

interface HorizontalTilesProps {
  sectionTitle?: string;
  arr: arrWithType;
  isCircle?: boolean;
  nav?: boolean;
  isHashtag?: boolean;
}

function HorizontalTiles({
  sectionTitle,
  arr,
  isCircle,
  nav,
  isHashtag,
}: HorizontalTilesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { artistImgUrls, loading } = useArtistImgUrl(arr.items);

  if (arr.items.length === 0) return <></>;

  const handleTileClick = (name: string) => {
    router.push(`/${arr.type}/${name}`);
  };

  return (
    <SectionGridContainer>
      {nav && <SectionNavigator refContainer={ref} scrollAmount={650} />}
      <SectionTitle>{sectionTitle}</SectionTitle>
      <Tiles
        ref={ref}
        className={`snap-x ${nav ? "gap-3" : "w-fit gap-10"} ${
          isCircle ? "gap-5" : ""
        } row-start-2 col-start-1 col-span-2`}
      >
        {arr.items
          .slice(0, arr.items.length - 1)
          .map((item: ItemProps, index) =>
            loading.has(index) ? (
              <TileSkeleton key={index} isCircle={isCircle} />
            ) : (
              <Tile
                key={index}
                item={item}
                handleTileClick={() => handleTileClick(item.name)}
                isCircle={isCircle}
                artistImgUrl={artistImgUrls.get(item.name!)}
                isHashtag={isHashtag}
              />
            )
          )}
      </Tiles>
    </SectionGridContainer>
  );
}

export default HorizontalTiles;
