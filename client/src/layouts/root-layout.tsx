import SiteSidebar from "@/components/site/site-sidebar";
import { UserDataType } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export default function RootLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });
  return (
    <section className="flex w-full">
      {authUser && <SiteSidebar />}
      <main
        className={
          pathname === "/"
            ? "container mx-auto"
            : pathname === "/auth"
            ? ""
            : "max-w-4xl mx-auto"
        }
      >
        {children}
      </main>
    </section>
  );
}
