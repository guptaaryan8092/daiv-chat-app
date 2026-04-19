import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';

/**
 * DeleteChatModal — confirm deletion of a full chat thread.
 */
export default function DeleteChatModal({ chatTitle, onConfirm, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-red-50">
            <Trash2 size={24} className="text-red-500" />
          </div>
        </div>

        <h2 className="text-base font-semibold text-gray-900 mb-2">
          Delete Chat
        </h2>
        <p className="text-sm text-gray-500 mb-1">
          Are you sure you want to delete
        </p>
        <p className="text-sm font-medium text-gray-800 mb-6 px-2 truncate">
          "{chatTitle}"?
        </p>
        <p className="text-xs text-gray-400 mb-6 -mt-4">
          All messages will be permanently removed.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
