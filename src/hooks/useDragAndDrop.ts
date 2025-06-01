import { useState } from 'react';
import type { Card } from '../common/types';
export function useDragAndDrop(
  updateCard: (card: Card) => void,
  wallRef: React.RefObject<HTMLDivElement>
) {
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';

    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedCard || !wallRef.current) return;

    const rect = wallRef.current.getBoundingClientRect();
    const cardWidth = 300;
    const cardHeight = 200;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const boundedX = Math.max(0, Math.min(x, rect.width - cardWidth));
    const boundedY = Math.max(0, Math.min(y, rect.height - cardHeight));

    updateCard({
      ...draggedCard,
      position: { x: boundedX, y: boundedY },
    });
    setDraggedCard(null);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    if (!draggedCard || !wallRef.current) return;

    const rect = wallRef.current.getBoundingClientRect();
    const cardWidth = 300;
    const cardHeight = 200;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const boundedX = Math.max(0, Math.min(x, rect.width - cardWidth));
    const boundedY = Math.max(0, Math.min(y, rect.height - cardHeight));

    updateCard({
      ...card,
      position: { x: boundedX, y: boundedY },
    });
    setDraggedCard(null);
  };

  return {
    draggedCard,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
