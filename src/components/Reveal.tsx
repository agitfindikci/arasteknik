import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Props = { children: ReactNode; className?: string; delay?: number; from?: "up" | "left" | "right" | "zoom" };

/** Fades/slides its children in the first time they scroll into view. */
export function Reveal({ children, className = "", delay = 0, from = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  return (
    <div ref={ref} style={style} data-from={from} className={`reveal ${shown ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
