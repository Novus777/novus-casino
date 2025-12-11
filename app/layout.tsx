import "./globals.css";
import ProfileListener from "./context/ProfileListener";

export const metadata = {
  title: "PHI Casino",
  description: "Next-gen on-chain casino experience"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProfileListener>
          {children}
        </ProfileListener>
      </body>
    </html>
  );
}
