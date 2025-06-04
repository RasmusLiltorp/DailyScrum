import { Suspense } from 'react';
import LobbyClientComponent from './LobbyClient';

export default async function LobbyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LobbyClientComponent lobbyCode={code} />
    </Suspense>
  );
}