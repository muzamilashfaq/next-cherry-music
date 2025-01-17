import Image from "next/image";
import { Icons } from "../../app/Icons";
import { TrackImgBox } from "@/styles/TrackCard";
import { Track } from "@/lib/server/database.types";

interface TrackCardImageProps {
  isCardHover: boolean;
  track: Track;
  size?: "small" | "medium" | "large";
}

function TrackCardImage({ isCardHover, track, size }: TrackCardImageProps) {
  return (
    <TrackImgBox>
      {isCardHover && size !== "small" && (
        <Icons.play
          color="white"
          fill="white"
          size={17}
          className="absolute ml-[0.8rem] mt-[0.7rem] opacity-100 z-10"
        />
      )}
      <Image
        alt="album image"
        className={`object-cover rounded-md box-border ${
          isCardHover ? "opacity-80" : ""
        } ${size === "small" ? "-mt-1" : ""}`}
        src={track.albumImgUrl || "/images/default_album_img.png"}
        height={size === "small" ? 36 : 47}
        width={size === "small" ? 36 : 47}
        blurDataURL="/images/default_album_img.png"
      />
    </TrackImgBox>
  );
}

export default TrackCardImage;
