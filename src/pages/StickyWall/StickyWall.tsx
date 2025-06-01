import React, { useState, useRef, useContext } from 'react';
import CardComponent from './Card';
import CardForm from './CardForm';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditCardModal from './EditCardModal';
import { useStickyWall } from '../../hooks/useStickyWall';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useCardColors } from '../../hooks/useCardColors';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import './StickyWall.scss';
import type { Card } from '../../common/types';

const StickyWall: React.FC = () => {
  const isDark = useContext(ThemeContext);
  const {
    cards,
    addCard: contextAddCard,
    updateCard,
    deleteCard: contextDeleteCard,
  } = useStickyWall();
  const [newCard, setNewCard] = useState({ title: '', content: '' });
  const [formVisibility, setFormVisibility] = useState(false);
  const [deleteConfirmCard, setDeleteConfirmCard] = useState<Card | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  const { getRandomColor } = useCardColors(cards, isDark, updateCard);
  const { handleDragStart, handleDragOver, handleDrop, handleDragEnd } =
    useDragAndDrop(updateCard, wallRef);

  const addCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCard.title && newCard.content && wallRef.current) {
      const wallRect = wallRef.current.getBoundingClientRect();
      const cardWidth = 300;
      const cardHeight = 200;

      const maxX = wallRect.width - cardWidth;
      const maxY = wallRect.height - cardHeight;

      const card = {
        title: newCard.title,
        content: newCard.content,
        color: getRandomColor(),
        position: {
          x: Math.max(0, Math.min(Math.random() * maxX, maxX)),
          y: Math.max(0, Math.min(Math.random() * maxY, maxY)),
        },
      };
      contextAddCard(card);
      setNewCard({ title: '', content: '' });
      setFormVisibility(false);
    }
  };

  const deleteCard = (id: number) => {
    contextDeleteCard(id);
    setDeleteConfirmCard(null);
  };

  const handleEditSubmit = (updatedCard: Card) => {
    updateCard(updatedCard);
    setEditingCard(null);
  };

  return (
    <div className="sticky-wall">
      <div className="sticky-wall-header">
        <Typography variant="title2">Sticky Wall</Typography>
        <Button
          className="add-note-button"
          color="task"
          onClick={() => setFormVisibility(true)}
          aria-label="Add new note"
          icon="add"
          iconPosition="prefix"
        >
          Add a new note
        </Button>
      </div>
      <div ref={wallRef} className="wall-container">
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onEdit={setEditingCard}
            onDelete={() => setDeleteConfirmCard(card)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      <Modal
        visible={formVisibility}
        onClose={() => setFormVisibility(false)}
        size="small"
      >
        <CardForm
          newCard={newCard}
          setNewCard={setNewCard}
          onClose={() => setFormVisibility(false)}
          addCard={addCard}
        />
      </Modal>

      <DeleteConfirmModal
        card={deleteConfirmCard}
        onClose={() => setDeleteConfirmCard(null)}
        onConfirm={deleteCard}
      />

      <EditCardModal
        card={editingCard}
        onClose={() => setEditingCard(null)}
        onSave={handleEditSubmit}
      />
    </div>
  );
};

export default StickyWall;
