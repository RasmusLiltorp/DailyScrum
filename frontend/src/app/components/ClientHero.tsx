"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ApiService from '@/services/ApiService';

export default function ClientHero() {
  const [lobbyCode, setLobbyCode] = useState<string>('');
  const [isCreatingLobby, setIsCreatingLobby] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [canCreate, setCanCreate] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(0);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const recentLobby = ApiService.getRecentLobby();
    if (recentLobby) {
      setLobbyCode(recentLobby.code);
    }
    
    const canCreateNow = ApiService.canCreateLobby();
    setCanCreate(canCreateNow);
    
    if (!canCreateNow) {
      startCountdown();
    }
  }, []);

  // Start a countdown timer for rate limit
  const startCountdown = () => {
    setCountdown(60);
    
    const interval = setInterval(() => {
      setCountdown((prevCount) => {
        const newCount = prevCount - 1;
        if (newCount <= 0) {
          clearInterval(interval);
          setCanCreate(true);
          return 0;
        }
        return newCount;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const getCaptchaToken = (): Promise<string> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !(window as any).grecaptcha || !siteKey) {
        resolve('');
        return;
      }

      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha
          .execute(siteKey, { action: 'create_lobby' })
          .then((token: string) => {
            resolve(token);
          })
          .catch(() => resolve(''));
      });
    });
  };

  const createLobby = async () => {
    setIsCreatingLobby(true);
    setError(null);

    try {
      if (!ApiService.canCreateLobby()) {
        throw new Error('You can only create one lobby per minute.');
      }

      const token = await getCaptchaToken();
      const lobby = await ApiService.createLobby(token);
      setLobbyCode(lobby.code);
      setCanCreate(false);
      startCountdown();
    } catch (error) {
      console.error('Error creating lobby:', error);
      setError(error instanceof Error ? error.message : 'Failed to create lobby');
    } finally {
      setIsCreatingLobby(false);
    }
  };

  return (
    <>
      {!lobbyCode ? (
        <>
          <button 
            className="btn btn-primary btn-lg" 
            onClick={createLobby}
            disabled={isCreatingLobby || !canCreate}
          >
            {isCreatingLobby ? (
              <>
                <span className="loading loading-spinner"></span>
                Creating lobby...
              </>
            ) : !canCreate ? (
              `Create Lobby (${countdown}s)`
            ) : (
              "Create Lobby"
            )}
          </button>
          
          {error && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </>
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