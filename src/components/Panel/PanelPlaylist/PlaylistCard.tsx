import { StyledCard, StyledHeader } from "@/styles/Panel/PlaylistCard";
import TrackCardImage from "@/components/TrackCard/TrackCardImage";
import TrackCardDetails from "@/components/TrackCard/TrackCardDetails";
import { useState } from "react";
import { Database } from "@/lib/server/database.types";

interface PlaylistCardProps {
  track: Database["public"]["Tables"]["tracks"]["Row"];
  index: number;
}
function PlaylistCard({ track, index }: PlaylistCardProps) {
  const [isCardHover, setIsCardHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);

  const iconColor = isCardHover || isDropdownHover ? "white" : "currentColor";

  return (
    <StyledCard
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
      radius="sm"
      className={`${
        isCardHover || isDropdownHover ? "bg-black/30" : "bg-white"
      } `}
    >
      <StyledHeader>
        <TrackCardImage isCardHover={isCardHover} track={track} size="small" />
        <TrackCardDetails
          isCardHover={isCardHover}
          track={track}
          size="small"
        />
      </StyledHeader>
    </StyledCard>
  );
}
export default PlaylistCard;