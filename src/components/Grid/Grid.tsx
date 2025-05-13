import { GridCell } from "../GridCell";
import styles from "./Grid.module.scss";
import { useState, useCallback } from "react";
import { ItemTypes } from "../TBlockSelector";

type Block = {
  shape: "T";
  rootIndex: number;
};

export function Grid({ className }: { className: string }) {
  const size = 5;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);
  const [invalidHighlightedCells, setInvalidHighlightedCells] = useState<number[]>([]);

  const getTBlockIndices = (root: number): number[] => {
    const indices = [root];
    if (root >= size) indices.push(root - size); // вверх
    if (root % size !== 0) indices.push(root - 1); // влево
    if ((root + 1) % size !== 0) indices.push(root + 1); // вправо
    return indices;
  };

  const canPlaceBlock = useCallback((index: number) => {
    const newBlockIndices = getTBlockIndices(index);
    const allOccupied = blocks.flatMap((block) =>
      getTBlockIndices(block.rootIndex)
    );
    return newBlockIndices.every((i) => !allOccupied.includes(i));
  }, [blocks]);

  const handleDrop = (index: number, item: { shape: "T" }) => {
    if (!canPlaceBlock(index)) {
      console.log("Занято, не добавляем блок");
      return;
    }
    setBlocks((prev) => [...prev, { shape: item.shape, rootIndex: index }]);
  };

  return (
    <div className={`${styles.grid} ${className}`}>
      {[...Array(size * size)].map((_, index) => {
        const allOccupied = blocks.flatMap((block) =>
          getTBlockIndices(block.rootIndex)
        );
        const hasBlock = allOccupied.includes(index);
        const isHighlighted = highlightedCells.includes(index);
        const isInvalid = invalidHighlightedCells.includes(index);

        return (
          <GridCell
            key={index}
            index={index}
            hasBlock={hasBlock}
            isHighlighted={isHighlighted}
            isInvalid={isInvalid}
            onDropBlock={handleDrop}
            onHover={() => {
              const newIndices = getTBlockIndices(index);
              if (canPlaceBlock(index)) {
                setHighlightedCells(newIndices);
                setInvalidHighlightedCells([]);
              } else {
                setHighlightedCells([]);
                setInvalidHighlightedCells(newIndices);
              }
            }}
            onLeave={() => {
              setHighlightedCells([]);
              setInvalidHighlightedCells([]);
            }}
            canDropChecker={() => canPlaceBlock(index)}
          />
        );
      })}
    </div>
  );
}
