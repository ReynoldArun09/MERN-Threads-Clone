import useTheme from "@/hooks/useTheme";

export default function SiteLogo() {
  const { setTheme, theme } = useTheme();
  return (
    <section>
      <img
        src={theme === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        className="w-6 cursor-pointer"
        alt="threads.net"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </section>
  );
}
