import Link from 'next/link';

interface LobbyHeaderProps {
  lobbyCode: string;
}

export default function LobbyHeader({ lobbyCode }: LobbyHeaderProps) {
  return (
    <div className="navbar bg-base-100 shadow-lg rounded-lg mb-6 border border-base-300/20">
      <div className="navbar-start">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-xl font-bold">Daily Standup</h1>
            <div className="flex items-center space-x-2 text-sm opacity-70">
              <span>Lobby:</span>
              <div className="badge badge-outline badge-sm font-mono">{lobbyCode}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <Link href="/" className="btn btn-ghost btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Exit
        </Link>
      </div>
    </div>
  );
}