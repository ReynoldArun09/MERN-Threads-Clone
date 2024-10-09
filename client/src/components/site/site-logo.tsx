import useTheme from "@/hooks/useTheme";
import { Link } from "react-router-dom";

export default function SiteLogo() {
  const { theme } = useTheme();
  return (
    <section>
      <Link to="/">
        <img
          src={theme === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          className="w-8 h-8 cursor-pointer"
          alt="threads.net"
        />
      </Link>
    </section>
  );
}
