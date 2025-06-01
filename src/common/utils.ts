import type { Task } from './types';

export const countUpcomingTasks = (tasks: Task[]) =>
  tasks.filter((task) => new Date(task.dueDate) > new Date()).length;

export const countTodaysTasks = (tasks: Task[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    return taskDate >= today && taskDate < tomorrow;
  }).length;
};

export const calculateDateRange = (sliderValue: number) => {
  const now = new Date();
  let startDate: Date,
    endDate: Date | null = null;

  // Utility function to reset time to 00:00:00
  const resetTime = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

  switch (true) {
    case sliderValue === 0:
      // Today: Start of day to end of day
      startDate = resetTime(new Date(now)); // Start of today
      endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
      break;

    case sliderValue <= 25: {
      // This Week: Start of the week (Monday) to end of the week (Sunday)
      const startOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay() + 1)
      ); // Monday
      startDate = resetTime(startOfWeek);
      endDate = new Date(now.setDate(startOfWeek.getDate() + 6)); // End of Sunday
      endDate.setHours(23, 59, 59, 999);
      break;
    }

    case sliderValue <= 50:
      // This Month: First day to last day of the month
      startDate = resetTime(new Date(now.getFullYear(), now.getMonth(), 1)); // First day of the month
      endDate = resetTime(new Date(now.getFullYear(), now.getMonth() + 1, 0)); // Last day of the month
      endDate.setHours(23, 59, 59, 999);
      break;

    case sliderValue <= 75:
      // This Year: First day to last day of the year
      startDate = resetTime(new Date(now.getFullYear(), 0, 1)); // First day of the year
      endDate = resetTime(new Date(now.getFullYear(), 11, 31)); // Last day of the year
      endDate.setHours(23, 59, 59, 999);
      break;

    default:
      // Next Two Years: From now to two years in the future
      startDate = resetTime(new Date(now)); // Start from now
      endDate = resetTime(new Date(now.setFullYear(now.getFullYear() + 2))); // Two years in the future
      endDate.setHours(23, 59, 59, 999);
      break;
  }

  return { startDate, endDate };
};

export const getAssistiveText = (validity: {
  state: 'valid' | 'invalid';
  message?: string;
}) => {
  if (validity.state === 'invalid' && validity.message) {
    return validity.message;
  }
  return '';
};
