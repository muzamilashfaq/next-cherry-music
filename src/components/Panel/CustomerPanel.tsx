import { Button } from "@nextui-org/button";
import { useUser } from "@supabase/auth-helpers-react";
import { Avatar } from "@nextui-org/avatar";
import { Icons } from "../Icons";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms";
import { CustomerPanelContainer } from "@/styles/Panel/Panel";

function CustomerPanel() {
  const user = useUser();
  const [isOpen, setIsOpen] = useRecoilState(authModalState);

  return (
    <CustomerPanelContainer>
      <Icons.bell />
      {user ? (
        <Avatar
          classNames={{
            base: "bg-gradient-to-br from-[#ffafe67b] to-[#ff005da2]",
            icon: "text-black/80",
          }}
          name={user.user_metadata.user_name}
          src=""
        />
      ) : (
        <Button
          startContent={<Icons.user2Icon />}
          variant="ghost"
          radius="full"
          isIconOnly
          onPress={() => setIsOpen(true)}
        />
      )}
    </CustomerPanelContainer>
  );
}
export default CustomerPanel;
