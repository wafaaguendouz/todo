import React, { useState } from 'react';
import Modal from './common/Modal';
import Input from './common/Input';
import Button from './common/Button';
import './ListModal.scss';

interface ListModalProps {
  closeModal: () => void;
  addNewList: (newList: { name: string; color: string }) => void;
}

const ListModal: React.FC<ListModalProps> = ({ closeModal, addNewList }) => {
  const [nameValue, setNameValue] = useState('');
  const [colorValue, setColorValue] = useState('');
  const [showNameValidation, setShowNameValidation] = useState(false);
  const [showColorValidation, setShowColorValidation] = useState(false);

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
    setShowNameValidation(true);
    setShowColorValidation(true);
    if (nameValue && colorValue) {
      addNewList({ name: nameValue, color: colorValue });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    setShowNameValidation(true);
  };

  const handleColorSelect = (value: string) => {
    setColorValue(value);
    setShowColorValidation(true);
  };

  const handleColorSectionClick = () => {
    setShowColorValidation(true);
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
              onChange={handleNameChange}
              required
              minLength={2}
              className="name-input"
            />
            {showNameValidation && !nameValue && (
              <div className="validation-message">Please enter a list name</div>
            )}
          </div>

          <div className="color-section" onClick={handleColorSectionClick}>
            <div className="section-header">
              <h3>Choose a color</h3>
            </div>
            <div className="color-options">
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  className={`color-option ${
                    colorValue === option.value ? 'selected' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleColorSelect(option.value);
                  }}
                  style={{ backgroundColor: option.color }}
                  title={option.label}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleColorSelect(option.value);
                    }
                  }}
                />
              ))}
            </div>
            {showColorValidation && !colorValue && (
              <div className="validation-message">Please select a color</div>
            )}
          </div>

          <div className="form-footer">
            <Button
              type="button"
              onClick={closeModal}
              className="cancel-button"
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create List
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ListModal;
