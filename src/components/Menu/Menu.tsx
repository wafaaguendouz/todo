import React, { useState, useMemo } from 'react';
import { useTasks } from '../../hooks/useTasksContext';
import { useTaskCategories } from '../../hooks/useTaskCategories';
import { useStickyWall } from '../../hooks/useStickyWall';
import ListModal from '../ListModal';
import { countTodaysTasks, countUpcomingTasks } from '../../common/utils';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import TasksSection from './components/TasksSection';
import ListsSection from './components/ListsSection';
import AISection from './components/AISection';
import './Menu.scss';

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useTasks();
  const { categories, addNewCategory } = useTaskCategories();
  const { cards } = useStickyWall();

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.belongingListName.toLowerCase().includes(query)
    );
  }, [searchQuery, tasks]);

  const countTaskByTimeCategory = (categoryName: string) => {
    switch (categoryName) {
      case 'Today':
        return countTodaysTasks(tasks);
      case 'Upcoming':
        return countUpcomingTasks(tasks);
      case 'Sticky Wall':
        return cards.length;
      default:
        return 0;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNewList = (newList: { name: string; color: string }) => {
    addNewCategory(newList);
    closeModal();
  };

  return (
    <div className="menu">
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {searchQuery.trim() ? (
        <SearchResults filteredTasks={filteredTasks} />
      ) : (
        <>
          <TasksSection
            tasks={tasks}
            countTaskByTimeCategory={countTaskByTimeCategory}
          />
          <ListsSection categories={categories} onAddNewList={openModal} />
          <AISection />
        </>
      )}
      {isModalOpen && (
        <ListModal closeModal={closeModal} addNewList={handleAddNewList} />
      )}
    </div>
  );
};

export default Menu;
