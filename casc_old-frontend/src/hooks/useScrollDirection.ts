import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down";

interface Options {
  threshold?: number;   // píxeles mínimos de cambio para considerar movimiento
  initialDirection?: Direction;
}

export function useScrollDirection({ threshold = 8, initialDirection = "up" }: Options = {}) {
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const lastY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = Math.abs(currentY - lastY.current);

      if (diff < threshold) return;

      const newDir: Direction = currentY > lastY.current ? "down" : "up";
      lastY.current = currentY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setDirection(newDir);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
