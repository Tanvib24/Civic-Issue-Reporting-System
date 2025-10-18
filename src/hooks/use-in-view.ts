import * as React from "react";

export function useInView(options?: IntersectionObserverInit) {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1, ...(options || {}) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { elementRef, isInView } as const;
}



