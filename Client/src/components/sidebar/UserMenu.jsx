import { useEffect, useRef } from 'react';
import { User, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react';

const MENU_ITEMS = [
  { icon: User,        label: 'My Account',    id: 'account' },
  { icon: CreditCard,  label: 'Upgrade Plan',  id: 'upgrade',  accent: true },
  { icon: Settings,    label: 'Settings',      id: 'settings' },
  { icon: HelpCircle,  label: 'Help & Support',id: 'help' },
  { icon: LogOut,      label: 'Log Out',       id: 'logout',   danger: true },
];

/**
 * UserMenu — floating dropdown triggered by the 3-dot button in the sidebar footer.
 */
export default function UserMenu({ onClose }) {
  const menuRef = useRef(null);

  // Close on outside click or Escape
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute bottom-full left-0 right-0 mb-2 mx-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-scaleIn z-50"
    >
      {MENU_ITEMS.map((item, i) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={onClose}
            className={`
              w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left
              ${item.danger  ? 'text-red-500 hover:bg-red-50' : ''}
              ${item.accent  ? 'text-primary-600 hover:bg-primary-50' : ''}
              ${!item.danger && !item.accent ? 'text-gray-700 hover:bg-gray-50' : ''}
              ${i > 0 && !item.danger ? 'border-t border-gray-50' : ''}
              ${item.danger ? 'border-t border-gray-100' : ''}
            `}
          >
            <Icon size={15} className="flex-shrink-0" />
            {item.label}
            {item.accent && (
              <span className="ml-auto text-xs font-semibold bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                Pro
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
