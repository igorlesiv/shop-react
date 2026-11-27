import type { ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function CartDrawer({ open, onClose, children }: Props) {
  return (
    <>
      <div className={`drawer-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`drawer${open ? ' open' : ''}`}>
        <button className="drawer-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </>
  );
}
