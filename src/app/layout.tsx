import Nav from "./components/Nav";
import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";
import Panel from "./components/Panel";
import Contents from "./components/Contents";
import Search from "./components/Search";

export const metadata = {
  title: "Cherry Music",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          <main>
            <Nav />
            <Contents />

            <Panel />
            {children}
          </main>{" "}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
