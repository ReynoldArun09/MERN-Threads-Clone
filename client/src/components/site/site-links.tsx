import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";

import { SignOutMutation } from "@/services/mutations/auth-mutations";
import TooltipWrapper from "../common/tooltip-wrapper";

export default function SiteLinks({ username }: { username: string }) {
  const { mutate: signout } = SignOutMutation();

  const handleLogout = () => {
    signout();
  };

  const sitelinks = [
    {
      name: "Profile",
      path: `/${username}`,
      icon: <RxAvatar size={24} />,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <BsFillChatQuoteFill size={24} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <MdOutlineSettings size={24} />,
    },
    {
      name: "Logout",
      icon: <FiLogOut size={24} onClick={handleLogout} />,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-10">
      {sitelinks.map((link) => (
        <Link to={link.path ? link.path : "#"} key={link.name}>
          <TooltipWrapper content={link.name}>{link.icon}</TooltipWrapper>
        </Link>
      ))}
    </section>
  );
}
