import { useQuery } from "@tanstack/react-query";
import SiteLinks from "./site-links";
import SiteLogo from "./site-logo";
import { UserDataType } from "@/services/types";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineWbSunny } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { GoMoon } from "react-icons/go";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTheme from "@/hooks/useTheme";
export default function SiteSidebar() {
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });
  const { setTheme, theme } = useTheme();
  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };
  return (
    <aside className="hidden w-[75px] h-screen fixed lg:flex flex-col justify-between items-center py-8">
      <div>
        <SiteLogo />
      </div>
      <div className="space-y-10">
        {authUser && (
          <Link to={"/"}>
            <AiFillHome size={25} />
            <span className="sr-only">Home</span>
          </Link>
        )}
        <SiteLinks username={authUser ? authUser.username : ""} />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdAlignHorizontalLeft />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="p-0">
              <Tabs defaultValue={theme}>
                <TabsList className="w-full border-none rounded-none gap-5">
                  <TabsTrigger
                    value="dark"
                    onClick={() => handleThemeChange("dark")}
                  >
                    <GoMoon size={20} />
                  </TabsTrigger>
                  <TabsTrigger
                    value="light"
                    onClick={() => handleThemeChange("light")}
                  >
                    <MdOutlineWbSunny size={20} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Report a problem</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
