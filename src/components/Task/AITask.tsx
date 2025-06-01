import React, { useState } from 'react';
import './AITask.scss';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { useTaskCategories } from '../../hooks/useTaskCategories';
import ListModal from '../ListModal';

interface AITaskProps {
  closeModal: () => void;
  addTask: (
    taskTitle: string,
    dueDate: Date,
    description: string,
    list: string
  ) => void;
}

const AITaskComponent: React.FC<AITaskProps> = ({ closeModal, addTask }) => {
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [list, setList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const { categories, addNewCategory } = useTaskCategories();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Integrate with OpenAI API here
    // For now, we'll just create a simple task
    addTask(
      `AI Task from: ${prompt}`,
      date,
      description ||
        'This task was generated using AI. The actual AI integration will be added later.',
      list || 'Personal'
    );

    setIsLoading(false);
    closeModal();
  };

  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      setIsListModalOpen(true);
    } else {
      setList(value);
    }
  };

  const handleAddNewList = (newList: { name: string; color: string }) => {
    addNewCategory(newList);
    setList(newList.name);
    setIsListModalOpen(false);
  };

  return (
    <Modal
      visible={true}
      onClose={closeModal}
      size="small"
      title="Generate Tasks with AI"
    >
      <div className="ai-task">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <Input
              name="prompt"
              type="textarea"
              label="What would you like to accomplish?"
              placeholder="e.g., Plan a trip to Japan, Fix my finances, Organize my home office..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              minLength={3}
              className="prompt-input"
            />
          </div>

          <div className="form-body">
            <div className="form-section">
              <div className="section-header">
                <Icon name="description" size={20} />
                <h3>Description</h3>
              </div>
              <Input
                type="textarea"
                name="description"
                placeholder="Add details about your task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-input"
              />
            </div>

            <div className="form-section">
              <div className="section-header">
                <Icon name="calendar" size={20} />
                <h3>Due Date</h3>
              </div>
              <input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="date-input"
              />
            </div>

            <div className="form-section">
              <div className="section-header">
                <Icon name="list" size={20} />
                <h3>List</h3>
              </div>
              <select
                value={list}
                onChange={handleListChange}
                className="list-select"
              >
                <option value="">Select a list</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
                <option value="new" className="add-list-option">
                  + Add new list
                </option>
              </select>
            </div>

            <div className="ai-info">
              <Icon name="info" size={20} />
              <p>
                Our AI will analyze your request and break it down into
                structured, actionable tasks. The actual AI integration will be
                added soon.
              </p>
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
              disabled={!prompt.trim() || isLoading}
              className="submit-button"
            >
              {isLoading ? 'Generating...' : 'Generate Tasks'}
            </Button>
          </div>
        </form>
      </div>

      {isListModalOpen && (
        <ListModal
          closeModal={() => setIsListModalOpen(false)}
          addNewList={handleAddNewList}
        />
      )}
    </Modal>
  );
};

export default AITaskComponent;
