import React, { useState } from 'react';
import AITaskComponent from '../../Task/AITask';
import { WandSparkles } from 'lucide-react';
import { useTasks } from '../../../hooks/useTasksContext';
import './AISection.scss';

const AISection: React.FC = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const { addTask } = useTasks();

  const openAIModal = () => {
    setIsAIModalOpen(true);
  };

  const closeAIModal = () => {
    setIsAIModalOpen(false);
  };

  return (
    <div className="ai-section">
      <button className="ai-action-button" onClick={openAIModal}>
        <WandSparkles size="16px" />
        <span>Generate Tasks with AI</span>
      </button>

      {isAIModalOpen && (
        <AITaskComponent closeModal={closeAIModal} addTask={addTask} />
      )}
    </div>
  );
};

export default AISection;
