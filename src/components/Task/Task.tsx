import React, { useState } from 'react';
import './Task.scss';
import type { Task } from '../../common/types';
import { useTaskCategories } from '../../hooks/useTaskCategories';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import ListModal from '../ListModal';
import Icon from '../common/Icon';

interface TaskProps {
  closeModal: () => void;
  addTask: (
    taskTitle: string,
    dueDate: Date,
    description: string,
    list: string
  ) => void;
  updateTask: (updatedTask: Task) => void;
  task?: Task;
}

const TaskComponent: React.FC<TaskProps> = ({
  closeModal,
  addTask,
  updateTask,
  task,
}) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [date, setDate] = useState<Date>(
    task?.dueDate ? new Date(task.dueDate) : new Date()
  );
  const [list, setList] = useState(task?.belongingListName || '');
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const { categories, addNewCategory } = useTaskCategories();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      updateTask({
        ...task,
        title,
        description,
        dueDate: date,
        belongingListName: list,
      });
    } else {
      addTask(title, date, description, list);
    }
  };

  const validateSubmit = (title: string, date: Date) => {
    return title.length >= 3 && date instanceof Date;
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
      title={task ? 'Edit Task' : 'Add Task'}
    >
      <div className="task">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <Input
              name="title"
              type="text"
              label="Title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={3}
              className="title-input"
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
              disabled={!validateSubmit(title, date)}
              className="submit-button"
            >
              {task ? 'Save Changes' : 'Add Task'}
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

export default TaskComponent;
