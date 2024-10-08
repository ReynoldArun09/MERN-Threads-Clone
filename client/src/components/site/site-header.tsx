import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import SiteLogo from "./site-logo";
import SiteLinks from "./site-links";
import { useQuery } from "@tanstack/react-query";
import { UserDataType } from "@/services/types";
import { AiFillHome } from "react-icons/ai";
import useAuthState from "@/hooks/useAuthState";

export default function SiteHeader() {
  const { ToggleAuthState } = useAuthState();
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });
  return (
    <header className="flex justify-between mt-6 mb-12">
      {authUser && (
        <Link to={"/"}>
          <AiFillHome size={25} />
          <span className="sr-only">Home</span>
        </Link>
      )}
      {!authUser && (
        <Button variant={"link"} onClick={() => ToggleAuthState("sign-in")}>
          Sign In
        </Button>
      )}
      <SiteLogo />
      {authUser && <SiteLinks username={authUser?.username} />}
      {!authUser && (
        <Button variant={"link"} onClick={() => ToggleAuthState("sign-up")}>
          Sign Up
        </Button>
      )}
    </header>
  );
}
