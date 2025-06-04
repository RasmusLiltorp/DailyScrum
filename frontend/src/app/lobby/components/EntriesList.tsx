import Link from 'next/link';
import { Entry } from '@/services/ApiService';
import EntryCard from './EntryCard';

interface EntriesListProps {
  entries: Entry[];
  loading: boolean;
  error: string | null;
  onEdit: (entry: Entry) => void;
}

export default function EntriesList({ 
  entries, 
  loading, 
  error, 
  onEdit 
}: EntriesListProps) {
  if (loading && entries.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  if (error && entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
        <Link href="/" className="btn btn-primary mt-4">
          Return Home
        </Link>
      </div>
    );
  }
    if (entries.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 mx-auto opacity-30">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No updates yet</h3>
          <p className="text-base-content/60 mb-4">
            Be the first team member to share your daily standup update!
          </p>
          <div className="text-sm text-base-content/40">
            Click the &quot;Share Your Update&quot; button above to get started
          </div>
        </div>
      </div>
    );
  }
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {entries.map((entry) => (
        <EntryCard 
          key={entry.id} 
          entry={entry} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
}