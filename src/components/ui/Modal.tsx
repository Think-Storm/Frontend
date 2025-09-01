import { useImperativeHandle, useRef } from "react";

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

export default function Modal({
  ref,
  children,
}: {
  ref: React.Ref<ModalHandle>;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
      close() {
        if (dialog.current) {
          dialog.current.close();
        }
      },
    };
  });
  return (
    <dialog
      ref={dialog}
      onClose={() => dialog.current?.close()}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-6 rounded-4xl bg-white backdrop:bg-black/50 w-[40%] max-w-[90vw] max-h-[100%] shadow-xl border border-gray-200"
    >
      <div className="flex flex-col items-center gap-4 w-full h-full p-6">
        {children}
      </div>
    </dialog>
  );
}
