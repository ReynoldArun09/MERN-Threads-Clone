import SiteHeader from "@/components/site/site-header";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export default function RootLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  return (
    <section className="relative w-full">
      <div
        className={
          pathname === "/"
            ? "container sm:max-w-2xl mx-auto md:max-w-4xl"
            : "max-w-2xl mx-auto"
        }
      >
        <SiteHeader />
        <main>{children}</main>
      </div>
    </section>
  );
}
