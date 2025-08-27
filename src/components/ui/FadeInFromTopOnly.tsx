"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function FadeInFromTopOnly({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const lastY = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const boundingTop = entry.boundingClientRect.top;
        const boundingBottom = entry.boundingClientRect.bottom;
        const viewportHeight = window.innerHeight;

        const isFullyVisible =
          boundingTop >= 0 && boundingBottom <= viewportHeight;

        const isScrollingDown =
          lastY.current === null ? false : boundingTop > lastY.current;
        lastY.current = boundingTop;

        if (isFullyVisible) {
          controls.set({ opacity: 1, y: 0 });
        } else if (entry.isIntersecting && !isScrollingDown) {
          controls.start({ opacity: 1, y: 0 });
        } else if (!entry.isIntersecting) {
          controls.set({ opacity: 0, y: 40 });
        }
      },
      {
        threshold: [0, 0.5, 1],
      },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
