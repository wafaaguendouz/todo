import React from 'react';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import type { Card } from '../../common/types';

interface DeleteConfirmModalProps {
  card: Card | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  card,
  onClose,
  onConfirm,
}) => {
  if (!card) return null;

  return (
    <Modal visible={true} onClose={onClose} size="small">
      <div className="delete-modal">
        <div className="modal-title">
          <Typography variant="title4">Delete Note</Typography>
        </div>
        <div className="modal-content">
          <Typography variant="body1">
            Are you sure you want to delete the note "{card.title}"? This action
            cannot be undone.
          </Typography>
        </div>
        <div className="modal-actions">
          <Button onClick={onClose}>Cancel</Button>
          <Button color="danger" elevated onClick={() => onConfirm(card.id)}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
