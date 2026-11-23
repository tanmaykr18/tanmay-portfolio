import "./globals.css";
import { Anton, Space_Grotesk, JetBrains_Mono, Kaushan_Script } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--f-display" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--f-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });
const script = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--f-script" });

export const metadata = {
  title: "Tanmay Kumar — Full-Stack Developer & AI Engineer",
  description: "Portfolio of Tanmay Kumar: multi-tenant SaaS, AI pipelines and real-time dashboards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable} ${mono.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
