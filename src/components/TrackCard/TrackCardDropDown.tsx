import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Icons } from "../Icons";

interface DropDownProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  iconColor: string;
}

function DropdownComponent({
  onMouseEnter,
  onMouseLeave,
  iconColor,
}: DropDownProps) {
  return (
    <Dropdown onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="light">
          <Icons.moreVertical color={iconColor} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu with icons"
        onAction={(key) => alert(key)}
      >
        {dropdownItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <DropdownItem key={item.key} startContent={item.icon}>
              {item.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
export default DropdownComponent;

type DropdownItemData = {
  key: string;
  label: string;
  icon: JSX.Element;
};

export const dropdownItems: DropdownItemData[] = [
  {
    key: "play-next",
    icon: <Icons.listVideo strokeWidth={1.5} />,
    label: "Play next",
  },
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
