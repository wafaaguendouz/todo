import React from 'react';
import Icon from '../../common/Icon';
import type { TaskCategory } from '../../../common/types';

interface ListSelectorProps {
  categories: TaskCategory[];
  selectedList: string;
  onListChange: (value: string) => void;
  onAddNewList: () => void;
}

const ListSelector: React.FC<ListSelectorProps> = ({
  categories,
  selectedList,
  onListChange,
  onAddNewList,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      onAddNewList();
    } else {
      onListChange(value);
    }
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <Icon name="list" size={20} />
        <h3>List</h3>
      </div>
      <select
        value={selectedList}
        onChange={handleChange}
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
  );
};

export default ListSelector;
