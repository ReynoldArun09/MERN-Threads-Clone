import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { BsInstagram } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { useQuery } from "@tanstack/react-query";
import { CgMoreO } from "react-icons/cg";
import { GetUserProfileQuery } from "@/services/queries/user-queries";
import { UserDataType } from "@/services/types";
import LoadingSpinner from "../common/loading-spinner";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

export default function UserHeader() {
  const { username } = useParams<{ username: string }>();
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });

  const { data: userInfo, isLoading } = GetUserProfileQuery(username!);

  if (!userInfo && isLoading) {
    return <LoadingSpinner />;
  }

  if (!userInfo && !isLoading) {
    return <h1>User not found</h1>;
  }

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast.success("URL copied to clipboard!");
    });
  };

  return (
    <section className="flex flex-col gap-4 items-start mt-6">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold">{userInfo?.username}</h1>
          <div className="flex gap-4 space-y-2 items-center">
            <h2 className="text-md">{userInfo?.name}</h2>
            <Badge className="text-xs rounded px-1 py-[2px] hover:bg-none">
              threads.net
            </Badge>
          </div>
        </div>
        <div>
          {userInfo?.profilePicture && (
            <Avatar className="w-24 h-24">
              <AvatarImage src={userInfo?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          {!userInfo?.profilePicture && (
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://bit.ly/broken-link" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
      {authUser?.id === userInfo?._id && (
        <Link to={"/update"}>
          <Button size={"lg"}>Update Profile</Button>
        </Link>
      )}
      <h1>{userInfo?.bio}</h1>
      <div className="flex w-full justify-between">
        <div className="flex gap-2 items-center">
          <h1>{userInfo?.followers.length} followers</h1>
          <div className="w-[1px] h-[1px] bg-gray-300 rounded"></div>
          <Link to={"/"} className="text-gray-500 underline">
            {authUser?.website}
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          <div>
            <BsInstagram size={25} />
          </div>

          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <CgMoreO size={18} />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={copyURL}>Copy Link</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      {authUser?.id !== userInfo?._id && (
        <div className="flex w-full gap-4 items-center">
          <Button className="w-full">{"Follow"}</Button>
          <Button className="w-full" variant={"secondary"}>
            {"Mention"}
          </Button>
        </div>
      )}
    </section>
  );
}
