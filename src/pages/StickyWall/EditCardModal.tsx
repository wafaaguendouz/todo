import React from 'react';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import type { Card } from '../../types/card';

interface EditCardModalProps {
  card: Card | null;
  onClose: () => void;
  onSave: (card: Card) => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  card,
  onClose,
  onSave,
}) => {
  if (!card) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(card);
  };

  return (
    <Modal visible={true} onClose={onClose} size="small">
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-content">
          <div className="form-title">
            <Typography variant="title4">Edit Note</Typography>
          </div>

          <div className="form-field">
            <label>Title</label>
            <input
              type="text"
              value={card.title}
              onChange={(e) => onSave({ ...card, title: e.target.value })}
              required
            />
          </div>

          <div className="form-field">
            <label>Content</label>
            <textarea
              value={card.content}
              onChange={(e) => onSave({ ...card, content: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" elevated>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCardModal;
