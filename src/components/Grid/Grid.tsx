import { GridCell } from "../GridCell"
import styles from "./Grid.module.scss"
import { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../TBlockSelector";

type Block = {
  shape: "T";
  rootIndex: number;
};

export function Grid({ className }: { className: string }) {
  const size = 5;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);

  const handleDrop = (index: number, item: { shape: "T" }) => {
    setBlocks(prev => [...prev, { shape: item.shape, rootIndex: index }]);
    setHighlightedCells([]); // сбрасываем подсветку после дропа
  };

  const getTBlockIndices = (root: number): number[] => {
    const indices = [root];
  
    if (root >= size) indices.push(root - size); // вверх
    if (root % size !== 0) indices.push(root - 1); // влево
    if ((root + 1) % size !== 0) indices.push(root + 1); // вправо
  
    return indices;
  };
  

  return (
    <div className={`${styles.grid} ${className}`}>
      {[...Array(size * size)].map((_, index) => {
        const hasBlock = blocks.some(block =>
          getTBlockIndices(block.rootIndex).includes(index)
        );
        const isHighlighted = highlightedCells.includes(index);

        return (
          <GridCell
            key={index}
            index={index}
            hasBlock={hasBlock}
            isHighlighted={isHighlighted}
            onDropBlock={handleDrop}
            onHover={(item) => {
              const newIndices = getTBlockIndices(index);
              setHighlightedCells(newIndices);
            }}
            onLeave={() => setHighlightedCells([])}
          />
        );
      })}
    </div>
  );
}
