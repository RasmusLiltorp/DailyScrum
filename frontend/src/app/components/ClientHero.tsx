"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function ClientHero() {
  const [lobbyCode, setLobbyCode] = useState<string>('');
  const [isCreatingLobby, setIsCreatingLobby] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');

  const createLobby = async () => {
    setIsCreatingLobby(true);
    try {
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setLobbyCode(randomCode);
    } catch (error) {
      console.error('Error creating lobby:', error);
    } finally {
      setIsCreatingLobby(false);
    }
  };

  return (
    <>
      {!lobbyCode ? (
        <button 
          className="btn btn-primary btn-lg" 
          onClick={createLobby}
          disabled={isCreatingLobby}
        >
          {isCreatingLobby ? (
            <>
              <span className="loading loading-spinner"></span>
              Creating lobby...
            </>
          ) : (
            "Create Lobby"
          )}
        </button>
      ) : (
        <div className="card bg-base-100 shadow-xl my-6">
          <div className="card-body">
            <h2 className="card-title justify-center">Your lobby is ready!</h2>
            <div className="bg-base-200 p-4 rounded-lg my-2">
              <span className="font-mono text-2xl tracking-widest">{lobbyCode}</span>
            </div>
            <p>Share this code with your team to invite them to the lobby.</p>
            <div className="card-actions justify-center mt-4">
              <Link href={`/lobby/${lobbyCode}`} className="btn btn-primary">
                Go to Lobby
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="divider my-8">OR</div>
      
      <div className="join">
        <input 
          type="text" 
          placeholder="Enter lobby code"
          className="input input-bordered join-item"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <Link 
          href={joinCode ? `/lobby/${joinCode}` : '#'} 
          className={`btn btn-accent join-item ${!joinCode && 'btn-disabled'}`}
        >
          Join
        </Link>
      </div>
    </>
  );
}