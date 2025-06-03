import { useState, useEffect } from 'react';
import ApiService, { Entry, CreateEntryDTO } from '@/services/ApiService';

interface EntryFormProps {
  lobbyCode: string;
  editingEntry: Entry | null;
  isOpen: boolean;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function EntryForm({
  lobbyCode,
  editingEntry,
  isOpen,
  onSubmitSuccess,
  onCancel
}: EntryFormProps) {
  const [name, setName] = useState<string>('');
  const [yesterday, setYesterday] = useState<string>('');
  const [today, setToday] = useState<string>('');
  const [blockers, setBlockers] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (editingEntry) {
      setName(editingEntry.name);
      setYesterday(editingEntry.yesterday);
      setToday(editingEntry.today);
      setBlockers(editingEntry.blockers);
    } else {
      setName('');
      setYesterday('');
      setToday('');
      setBlockers('');
    }
    setError(null);
  }, [editingEntry, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !today.trim()) {
      setError("Name and today's plan are required.");
      return;
    }

    const isDuplicate = entries.some(
      (entry) =>
        entry.name === name &&
        entry.yesterday === yesterday &&
        entry.today === today &&
        entry.blockers === blockers
    );

    if (isDuplicate) {
      setError('Duplicate entry detected. Please modify your entry.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const entryData: CreateEntryDTO = {
        name,
        yesterday,
        today,
        blockers
      };

      const response = await ApiService.addEntry(lobbyCode, entryData);
      setEntries((prevEntries) => [...prevEntries, response]);
      onSubmitSuccess();
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit your update. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {editingEntry ? (
              <>
                <EditIcon /> Edit Your Update
              </>
            ) : (
              <>
                <ChatBubbleIcon /> Share Your Update
              </>
            )}
          </h2>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <CloseIcon />
          </button>
        </div>

        {error && (
          <div className="alert alert-error mb-4 flex items-center gap-2">
            <ErrorIcon />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Your Name</span>
              <span className="label-text-alt text-error">*</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">What did you do yesterday?</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24 resize-none"
              placeholder="Yesterday's achievements..."
              value={yesterday}
              onChange={(e) => setYesterday(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">What will you do today?</span>
              <span className="label-text-alt text-error">*</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24 resize-none"
              placeholder="Today's plans..."
              value={today}
              onChange={(e) => setToday(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Any blockers or impediments?</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24 resize-none"
              placeholder="Anything blocking your progress..."
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !name.trim() || !today.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Submitting...
                </>
              ) : (
                editingEntry ? 'Update Entry' : 'Submit Update'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
  </svg>
);

const ChatBubbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
