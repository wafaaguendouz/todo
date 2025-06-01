import { useEffect, useState } from 'react';
import type { SetStateAction } from 'react';
import TaskList from '../../components/TaskList';
import { useTasks } from '../../hooks/useTasksContext';
import './Home.scss';
import type { Task } from '../../common/types';
import { calculateDateRange } from '../../common/utils';
import Typography from '../../components/common/Typography';
import Slider, { SliderMarker } from '../../components/common/Slider';

const Home = () => {
  const [value, setValue] = useState([100]);
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const onValueChange = (e: { detail: SetStateAction<number[]> }) => {
    setValue(e.detail);
  };
  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(value[0]);

    const filtered = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);

      if (endDate) {
        // to make sure taskDate is between start and end date for all periods
        return taskDate >= startDate && taskDate <= endDate;
      } else {
        // for filters without endDate, check if taskDate >= filterDate
        return taskDate >= startDate;
      }
    });
    setFilteredTasks(filtered);
  }, [value, tasks]);

  return (
    <div className="home-container">
      <Typography variant="title3">Home page</Typography>
      {/* filter by time */}

      <div className="slider-container">
        <Slider
          value={value}
          onValueChange={onValueChange}
          step={25}
          ticks
          showValueLabel
          tickIntervals={25}
        >
          <SliderMarker value={0}>Today</SliderMarker>
          <SliderMarker value={25}>This Week</SliderMarker>
          <SliderMarker value={50}>This Month</SliderMarker>
          <SliderMarker value={75}>This Year</SliderMarker>
          <SliderMarker value={100}>Next Two years</SliderMarker>
        </Slider>
      </div>

      {/* Showing all tasks */}
      <div className="tasks-container">
        <TaskList
          title="Tasks"
          tasks={filteredTasks}
          noTasks="No tasks available. Click 'Add Task' to add some!"
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Home;
