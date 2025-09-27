"use client";

import { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
}>;

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
} 