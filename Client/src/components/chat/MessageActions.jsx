import { Pencil, Trash2 } from 'lucide-react';

/**
 * MessageActions — edit and delete icon buttons shown on user-message hover.
 */
export default function MessageActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-1 justify-end">
      <button
        onClick={onEdit}
        className="p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all"
        title="Edit message"
      >
        <Pencil size={13} />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
        title="Delete message"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}
