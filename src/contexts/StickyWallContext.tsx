import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { initialCards } from '../common/initialData';
import type { Card } from '../common/types';

export interface StickyWallContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id'>) => void;
  updateCard: (card: Card) => void;
  deleteCard: (cardId: number) => void;
}

export const StickyWallContext = createContext<
  StickyWallContextType | undefined
>(undefined);

interface StickyWallProviderProps {
  children: ReactNode;
}

export const StickyWallProvider: React.FC<StickyWallProviderProps> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const addCard = (card: Omit<Card, 'id'>) => {
    const newCard: Card = {
      ...card,
      id: cards.length + 1,
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (updatedCard: Card) => {
    setCards(
      cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const deleteCard = (cardId: number) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  return (
    <StickyWallContext.Provider
      value={{ cards, addCard, updateCard, deleteCard }}
    >
      {children}
    </StickyWallContext.Provider>
  );
};
