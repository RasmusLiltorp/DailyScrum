import { useState } from 'react';
import { Entry } from '@/services/ApiService';

interface EntryCardProps {
  entry: Entry;
  onEdit: (entry: Entry) => void;
}

export default function EntryCard({ entry, onEdit }: EntryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 p-4 max-w-md w-full cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold truncate">{entry.name}</h2>
          <button 
            className="btn btn-ghost btn-sm btn-circle"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(entry);
            }}
            aria-label="Edit entry"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 text-sm">
          {entry.yesterday && (
            <div>
              <span className="badge badge-success badge-sm mb-1">Yesterday</span>
              <div className="max-h-24 overflow-y-auto whitespace-pre-wrap break-words pr-1">
                {entry.yesterday}
              </div>
            </div>
          )}

          <div>
            <span className="badge badge-primary badge-sm mb-1">Today</span>
            <div className="max-h-24 overflow-y-auto whitespace-pre-wrap break-words pr-1">
              {entry.today}
            </div>
          </div>

          {entry.blockers && (
            <div>
              <span className="badge badge-warning badge-sm mb-1">Blockers</span>
              <div className="max-h-20 overflow-y-auto whitespace-pre-wrap break-words pr-1">
                {entry.blockers}
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">{entry.name}</h2>
            {entry.yesterday && (
              <div className="mb-4">
                <span className="badge badge-success badge-sm mb-1">Yesterday</span>
                <div className="whitespace-pre-wrap break-words">
                  {entry.yesterday}
                </div>
              </div>
            )}

            <div className="mb-4">
              <span className="badge badge-primary badge-sm mb-1">Today</span>
              <div className="whitespace-pre-wrap break-words">
                {entry.today}
              </div>
            </div>

            {entry.blockers && (
              <div>
                <span className="badge badge-warning badge-sm mb-1">Blockers</span>
                <div className="whitespace-pre-wrap break-words">
                  {entry.blockers}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
