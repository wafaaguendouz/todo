import { useEffect } from 'react';
import type { Card } from '../common/types';

export function useCardColors(
  cards: Card[],
  isDark: boolean,
  updateCard: (card: Card) => void
) {
  useEffect(() => {
    const updateCardColors = () => {
      cards.forEach((card) => {
        const match = card.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (match) {
          const [, hue, saturation] = match;
          const newLightness = isDark ? 40 : 90;
          const newColor = `hsl(${hue}, ${saturation}%, ${newLightness}%)`;

          if (newColor !== card.color) {
            updateCard({
              ...card,
              color: newColor,
            });
          }
        }
      });
    };

    updateCardColors();
  }, [isDark, cards, updateCard]);

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 80;
    const lightness = isDark ? 40 : 90;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return { getRandomColor };
}
