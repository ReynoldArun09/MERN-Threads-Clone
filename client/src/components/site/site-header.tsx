import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserDataType } from "@/services/types";
import { useQuery } from "@tanstack/react-query";

export default function SiteHeader() {
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });
  return (
    <div className="flex items-center">
      <Link to="/" className="font-bold py-5 mx-auto">
        Home
      </Link>
      {!authUser && <Button className="fixed right-8 top-8">Login</Button>}
    </div>
  );
}
