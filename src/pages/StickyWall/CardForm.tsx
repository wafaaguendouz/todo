import React from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';

interface CardFormProps {
  onClose: () => void;
  addCard: (e: React.FormEvent<HTMLFormElement>) => void;
  newCard: { title: string; content: string };
  setNewCard: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }>
  >;
}

const CardForm: React.FC<CardFormProps> = ({
  onClose,
  addCard,
  newCard,
  setNewCard,
}) => {
  return (
    <form onSubmit={addCard} style={{ width: '100%' }}>
      <div style={{ padding: '16px' }}>
        <Typography variant="title4" style={{ paddingBottom: '16px' }}>
          New Note
        </Typography>

        <Input
          label="Title"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
          required
        />

        <Input
          label="Content"
          type="textarea"
          value={newCard.content}
          onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
          required
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
        }}
      >
        <Button type="button" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" elevated>
          Add Note
        </Button>
      </div>
    </form>
  );
};

export default CardForm;
