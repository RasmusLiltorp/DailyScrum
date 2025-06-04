"use client"

import { useState } from 'react';
import LobbyHeader from '../components/LobbyHeader';
import EntryForm from '../components/EntryForm';
import EntriesList from '../components/EntriesList';
import useLobbyData from '../hooks/useLobbyData';
import { Entry } from '@/services/ApiService';

interface LobbyClientProps {
  lobbyCode: string;
}

export default function LobbyClient({ lobbyCode }: LobbyClientProps) {
  const { lobby, loading, error, refreshLobby } = useLobbyData(lobbyCode);
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  
  const handleSubmitSuccess = () => {
    setShowEntryForm(false);
    setEditingEntry(null);
    refreshLobby();
  };
  
  const startEditing = (entry: Entry) => {
    setEditingEntry(entry);
    setShowEntryForm(true);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto p-4 max-w-7xl">
        <LobbyHeader lobbyCode={lobbyCode} />
        
        <div className="mb-6">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                Ready to share your update?
              </h2>
              <p className="mb-4">Let your team know what you&apos;ve been working on</p>
              <button 
                className="btn btn-accent btn-lg" 
                onClick={() => setShowEntryForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Share Your Update
              </button>
            </div>
          </div>
        </div>
        
        <EntriesList 
          entries={lobby?.entries || []}
          loading={loading}
          error={error}
          onEdit={startEditing}
        />

        <EntryForm 
          lobbyCode={lobbyCode}
          editingEntry={editingEntry}
          isOpen={showEntryForm}
          onSubmitSuccess={handleSubmitSuccess}
          onCancel={() => {
            setShowEntryForm(false);
            setEditingEntry(null);
          }}
        />
      </div>
    </div>
  );
}
