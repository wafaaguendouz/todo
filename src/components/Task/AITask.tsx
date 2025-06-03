import React, { useState } from 'react';
import './AITask.scss';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useTaskCategories } from '../../hooks/useTaskCategories';
import ListModal from '../ListModal';

interface GeneratedTask {
  title: string;
  description: string;
  dueDate: Date;
  list: string;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
  const [selectedList, setSelectedList] = useState('');
  const { categories, addNewCategory } = useTaskCategories();

  const generateTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/generate-tasks?task=${encodeURIComponent(prompt)}`
      );
      console.log(response);
      if (!response.ok) throw new Error('Failed to generate tasks');

      const data = await response.json();
      // Transform the API response to match our GeneratedTask interface
      const tasks: GeneratedTask[] = data.map((task: any) => ({
        title: task.task,
        description: task.description,
        dueDate: new Date(task.deadline),
        list: selectedList || 'Personal',
      }));
      setGeneratedTasks(tasks);
    } catch (error) {
      console.error('Error generating tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (generatedTasks.length === 0) {
      await generateTasks();
    } else {
      // Create all generated tasks
      const tasksToCreate = [...generatedTasks];
      for (const task of tasksToCreate) {
        await addTask(task.title, task.dueDate, task.description, task.list);
      }
      closeModal();
    }
  };

  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      setIsListModalOpen(true);
    } else {
      setSelectedList(value);
      // Update list for all generated tasks
      setGeneratedTasks((prev) =>
        prev.map((task) => ({ ...task, list: value }))
      );
    }
  };

  const handleAddNewList = (newList: { name: string; color: string }) => {
    addNewCategory(newList);
    setSelectedList(newList.name);
    // Update list for all generated tasks
    setGeneratedTasks((prev) =>
      prev.map((task) => ({ ...task, list: newList.name }))
    );
    setIsListModalOpen(false);
  };

  const updateGeneratedTask = (
    index: number,
    field: keyof GeneratedTask,
    value: string | Date
  ) => {
    setGeneratedTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, [field]: value } : task))
    );
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
            <div className="form-section">
              <div className="section-header">
                <h3>List</h3>
              </div>
              <select
                value={selectedList}
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

            {generatedTasks.length > 0 && (
              <div className="generated-tasks">
                <h3>Generated Tasks</h3>
                {generatedTasks.map((task, index) => (
                  <div key={index} className="generated-task">
                    <Input
                      type="text"
                      value={task.title}
                      onChange={(e) =>
                        updateGeneratedTask(index, 'title', e.target.value)
                      }
                      className="task-title"
                    />
                    <Input
                      type="textarea"
                      value={task.description}
                      onChange={(e) =>
                        updateGeneratedTask(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                      className="task-description"
                    />
                    <input
                      type="date"
                      value={task.dueDate.toISOString().split('T')[0]}
                      onChange={(e) =>
                        updateGeneratedTask(
                          index,
                          'dueDate',
                          new Date(e.target.value)
                        )
                      }
                      className="task-date"
                    />
                  </div>
                ))}
              </div>
            )}

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
              color="secondary"
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
