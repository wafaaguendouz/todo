import React from 'react';
import Typography from '../../components/common/Typography';
import './Card.scss';
import Icon from '../../components/common/Icon';

interface Card {
  id: number;
  title: string;
  content: string;
  color: string;
  position: {
    x: number;
    y: number;
  };
}

interface CardProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (cardId: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger edit if clicking the delete button
    if ((e.target as HTMLElement).closest('.delete-button')) {
      return;
    }
    onEdit(card);
  };

  return (
    <div
      className="sticky-card"
      draggable
      onClick={handleClick}
      onDragStart={(e) => onDragStart(e, card)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, card)}
      onDragEnd={(e) => onDragEnd(e, card)}
      style={{
        backgroundColor: card.color || 'var(--background-color)',
        left: `${card.position.x}px`,
        top: `${card.position.y}px`,
      }}
    >
      <div className="card-header">
        <div className="card-title">
          <Typography variant="title4">{card.title}</Typography>
        </div>
        <button className="delete-button" onClick={() => onDelete(card.id)}>
          <Icon name="trash" />
        </button>
      </div>

      <div className="card-content">
        <div className="content-text">
          <Typography variant="body1">{card.content}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Card;
