import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lobby",
  description: "Participate in your team's daily standup meeting",
};

export default async function LobbyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  
  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-base-100 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="text-sm breadcrumbs">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li>Lobby</li>
                <li className="font-mono">{code}</li>
              </ul>
            </div>
            <div className="text-xs opacity-60 flex items-center gap-2">
              <div className="loading loading-ring loading-xs"></div>
              Auto-refreshing
            </div>
          </div>
        </div>
      </div>

      <main className="pb-8">{children}</main>
    </div>
  );
}
