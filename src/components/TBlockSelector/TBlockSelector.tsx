// components/TBlockSelector.tsx
import { useDrag } from "react-dnd";
import styles from "./TBlockSelector.module.scss";
import { useRef, useEffect } from "react";

export const ItemTypes = {
  BLOCK: "block",
};

export function TBlockSelector() {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {
      shape: "T",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [ref, drag]);

  return (
    <div
      ref={ref}
      className={styles.selector}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      T
    </div>
  );
}
