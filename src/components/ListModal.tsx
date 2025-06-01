import React, { useState } from 'react';
import Modal from './common/Modal';
import Input from './common/Input';
import Button from './common/Button';
import Icon from './common/Icon';
import './ListModal.scss';

interface ListModalProps {
  closeModal: () => void;
  addNewList: (newList: { name: string; color: string }) => void;
}

const ListModal: React.FC<ListModalProps> = ({ closeModal, addNewList }) => {
  const [nameValue, setNameValue] = useState('');
  const [colorValue, setColorValue] = useState('');

  const colorOptions = [
    {
      value: 'var(--primary-color)',
      label: 'Primary',
      color: 'var(--primary-color)',
    },
    {
      value: 'var(--success-color)',
      label: 'Green',
      color: 'var(--success-color)',
    },
    {
      value: 'var(--warning-color)',
      label: 'Yellow',
      color: 'var(--warning-color)',
    },
    {
      value: 'var(--danger-color)',
      label: 'Red',
      color: 'var(--danger-color)',
    },
    {
      value: 'var(--info-color)',
      label: 'Blue',
      color: 'var(--info-color)',
    },
    {
      value: 'var(--purple-color)',
      label: 'Purple',
      color: 'var(--purple-color)',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameValue && colorValue) {
      addNewList({ name: nameValue, color: colorValue });
    }
  };

  return (
    <Modal
      visible={true}
      onClose={closeModal}
      size="small"
      title="Create a new list"
    >
      <div className="list-modal">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <Input
              name="categoryName"
              type="text"
              label="List name"
              placeholder="Enter list name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              required
              minLength={2}
              className="name-input"
            />
          </div>

          <div className="color-section">
            <div className="section-header">
              <Icon name="palette" size={20} />
              <h3>Choose a color</h3>
            </div>
            <div className="color-options">
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  className={`color-option ${
                    colorValue === option.value ? 'selected' : ''
                  }`}
                  onClick={() => setColorValue(option.value)}
                  style={{ backgroundColor: option.color }}
                  title={option.label}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setColorValue(option.value);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="form-footer">
            <Button
              type="button"
              onClick={closeModal}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={!nameValue || !colorValue}
              className="submit-button"
            >
              Create List
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ListModal;
