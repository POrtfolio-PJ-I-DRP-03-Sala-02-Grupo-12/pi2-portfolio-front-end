import { useEffect, useRef, useState } from "react";

/**
 * Detects when an element enters the viewport (client-only).
 * @param {{ rootMargin?: string; initialInView?: boolean }} options
 */
export function useInView(options = {}) {
  const { rootMargin = "200px 0px", initialInView = false } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(initialInView);

  useEffect(() => {
    if (initialInView) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [initialInView, rootMargin]);

  return [ref, inView];
}
