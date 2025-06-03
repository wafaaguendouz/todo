import React, { useState } from 'react';
import './AITask.scss';
import Modal from '../../common/Modal';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import { useTaskCategories } from '../../../hooks/useTaskCategories';
import ListModal from '../../ListModal';
import type { AITaskProps } from './types';
import { useTaskGeneration } from './useTaskGeneration';
import GeneratedTasksList from './GeneratedTasksList';
import ListSelector from './ListSelector';

const AITaskComponent: React.FC<AITaskProps> = ({ closeModal, addTask }) => {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const { categories, addNewCategory } = useTaskCategories();
  const {
    prompt,
    setPrompt,
    isLoading,
    generatedTasks,
    generateTasks,
    updateGeneratedTask,
  } = useTaskGeneration();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (generatedTasks.length === 0) {
      await generateTasks(selectedList);
    } else {
      // Create all generated tasks
      for (const task of generatedTasks) {
        addTask(task.title, task.dueDate, task.description, task.list);
      }
      closeModal();
    }
  };

  const handleListChange = (value: string) => {
    setSelectedList(value);
    // Update list for all generated tasks
    updateGeneratedTask(0, 'list', value);
  };

  const handleAddNewList = (newList: { name: string; color: string }) => {
    addNewCategory(newList);
    setSelectedList(newList.name);
    // Update list for all generated tasks
    updateGeneratedTask(0, 'list', newList.name);
    setIsListModalOpen(false);
  };

  return (
    <Modal
      visible={true}
      onClose={closeModal}
      size="large"
      title="Generate Tasks with AI"
    >
      <div className="ai-task">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <Input
              name="prompt"
              type="textarea"
              label="What would you like to accomplish?"
              placeholder="e.g., Plan a trip to Berlin, Fix my finances, Organize my home office..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              minLength={3}
              className="prompt-input"
            />
          </div>

          <div className="form-body">
            <ListSelector
              categories={categories}
              selectedList={selectedList}
              onListChange={handleListChange}
              onAddNewList={() => setIsListModalOpen(true)}
            />

            <GeneratedTasksList
              tasks={generatedTasks}
              onTaskUpdate={updateGeneratedTask}
            />

            <div className="ai-info">
              <p>
                Our AI will analyze your request and break it down into
                structured, actionable tasks. You can review and edit the
                generated tasks before creating them.
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
            >
              {isLoading
                ? 'Generating...'
                : generatedTasks.length > 0
                ? 'Create Tasks'
                : 'Generate Tasks'}
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
