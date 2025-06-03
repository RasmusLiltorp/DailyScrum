import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Standup Lobby | DailyScrum",
  description: "Participate in your team's daily standup meeting",
};

export default function LobbyLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { code: string };
}>) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-base-100 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="text-sm breadcrumbs">
              <ul>
                <li><a href="/">Home</a></li>
                <li>Lobby</li>
                <li className="font-mono">{params.code}</li>
              </ul>
            </div>
            
            <div className="text-xs opacity-60 flex items-center gap-2">
              <div className="loading loading-ring loading-xs"></div>
              Auto-refreshing
            </div>
          </div>
        </div>
      </div>
      
      <main className="pb-8">
        {children}
      </main>
    
    </div>
  );
}