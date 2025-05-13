import { useCallback } from "react";
import { useDrop } from "react-dnd";
import styles from "./GridCell.module.scss";
import { ItemTypes } from "../TBlockSelector";

type DragItem = {
  shape: "T";
};

export function GridCell({
  index,
  hasBlock,
  isHighlighted,
  onDropBlock,
  onHover,
  onLeave,
}: {
  index: number;
  hasBlock: boolean;
  isHighlighted: boolean;
  onDropBlock: (index: number, item: DragItem) => void;
  onHover: (item: DragItem) => void;
  onLeave: () => void;
}) {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item) => onDropBlock(index, item),
    hover: (item) => onHover(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [index]);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) drop(node);
    },
    [drop]
  );

  return (
    <div
      ref={setRef}
      className={styles.cell}
      onMouseLeave={onLeave}
      style={{
        backgroundColor: isHighlighted
          ? "#cfffcf"
          : hasBlock
          ? "#8af"
          : undefined,
      }}
    />
  );
}
