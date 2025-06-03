import { useState, useEffect, useCallback } from 'react';
import ApiService, { Lobby } from '@/services/ApiService';

export default function useLobbyData(lobbyCode: string) {
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchLobbyData = useCallback(async () => {
    if (!lobbyCode) return;
    
    try {
      setLoading(true);
      const lobbyData = await ApiService.getLobby(lobbyCode);
      setLobby(lobbyData);
      setError(null);
    } catch (err) {
      console.error('Error fetching lobby:', err);
      setError('Failed to load lobby data. The lobby may have expired.');
    } finally {
      setLoading(false);
    }
  }, [lobbyCode]);
  
  useEffect(() => {
    fetchLobbyData();
    
    const intervalId = setInterval(fetchLobbyData, 10000);
    
    return () => clearInterval(intervalId);
  }, [fetchLobbyData]);
  
  return {
    lobby,
    loading,
    error,
    refreshLobby: fetchLobbyData
  };
}