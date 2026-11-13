import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/** Lazy: the modal (and its form code) only loads the first time someone opens it. */
const BookingModal = lazy(() => import("./BookingModal"));

type OpenOptions = {
  /** Optional service slug (or test name) to pre-select in the form */
  preselect?: string;
};

type BookingContextValue = {
  open: (options?: OpenOptions) => void;
  close: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preselect, setPreselect] = useState<string | undefined>();

  const open = useCallback((options?: OpenOptions) => {
    setPreselect(options?.preselect);
    setMounted(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <BookingModal open={isOpen} onClose={close} preselect={preselect} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
}

/** `const { open } = useBooking(); <Button onClick={() => open()}>Book Appointment</Button>` */
export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
