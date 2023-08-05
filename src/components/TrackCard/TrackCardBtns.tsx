import { Buttons } from "@/styles/TrackCard";
import { Icons } from "../../app/Icons";
import TrackCardDropDown from "./TrackCardDropDown";
import { DropdownItemData } from "@/types/itemTypes";
import { Dispatch, SetStateAction } from "react";
import { Track } from "@/lib/server/database.types";
import LikeButton from "../Btns/LikeButton";

interface TrackCardButtonsProps {
  isCardHover: boolean;
  setIsCardHover: Dispatch<SetStateAction<boolean>>;
  setIsDropdownHover: Dispatch<SetStateAction<boolean>>;
  iconColor: string;
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;

  track: Track;
}
function TrackCardButtons({
  track,
  isCardHover,
  setIsDropdownHover,
  iconColor,
  liked,
  setLiked,
  setIsCardHover,
}: TrackCardButtonsProps) {
  return (
    <>
      {isCardHover && (
        <Buttons>
          <LikeButton liked={liked} setLiked={setLiked} iconColor={iconColor} />
          <TrackCardDropDown
            track={track}
            onMouseEnter={() => setIsDropdownHover(true)}
            onMouseLeave={() => setIsDropdownHover(false)}
            dropdownItems={dropdownItems}
            setIsCardHover={setIsCardHover}
            setIsDropdownHover={setIsDropdownHover}
          />
        </Buttons>
      )}
    </>
  );
}
export default TrackCardButtons;

const dropdownItems: DropdownItemData[] = [
  {
    key: "add-to-queue",
    icon: <Icons.listMusic strokeWidth={1.5} />,
    label: "Add to queue",
  },
  {
    key: "add-to-playlist",
    icon: <Icons.listPlus strokeWidth={1.5} />,
    label: "Add to playlist",
  },
  {
    key: "go-to-album",
    icon: <Icons.disc strokeWidth={1.5} />,
    label: "Go to album",
  },
  {
    key: "go-to-artist",
    icon: <Icons.mic2 strokeWidth={1.5} />,
    label: "Go to artist",
  },
];
