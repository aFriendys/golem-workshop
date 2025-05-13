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
  isInvalid,
  onDropBlock,
  onHover,
  onLeave,
  canDropChecker,
}: {
  index: number;
  hasBlock: boolean;
  isHighlighted: boolean;
  isInvalid: boolean;
  onDropBlock: (index: number, item: DragItem) => void;
  onHover: (item: DragItem) => void;
  onLeave: () => void;
  canDropChecker: () => boolean;
}) {
  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>(
    () => ({
      accept: ItemTypes.BLOCK,
      drop: (item) => onDropBlock(index, item),
      hover: (item) => onHover(item),
      canDrop: () => canDropChecker(),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [index, canDropChecker]
  );

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) drop(node);
    },
    [drop]
  );

  const backgroundColor = isOver && canDrop
    ? "#cfffcf"
    : isHighlighted
    ? "#cfffcf"
    : isInvalid
    ? "#ffcfcf"
    : hasBlock
    ? "#8af"
    : undefined;

  return (
    <div
      ref={setRef}
      className={styles.cell}
      onMouseLeave={onLeave}
      style={{ backgroundColor }}
    />
  );
}
