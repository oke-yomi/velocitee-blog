import "./globals.css";
import { Footer, Navbar } from "@/components";

export const metadata = {
  title: "Velocitee Blog",
  description: "Velocitee Blog with Nextjs, typescript and Graphql",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
