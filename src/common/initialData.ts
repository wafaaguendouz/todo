import { v4 as uuidv4 } from 'uuid';
import type { Task } from './types';
import type { Card } from './types';

export const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Complete project documentation',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    description: 'Write comprehensive documentation for the current project',
    belongingListName: 'Work',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Grocery shopping',
    dueDate: new Date(new Date().setDate(new Date().getDate())),
    description: 'Buy groceries for the week',
    belongingListName: 'Personal',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Schedule dentist appointment',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    description: 'Call and schedule annual dental checkup',
    belongingListName: 'Personal',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Team meeting preparation',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    description: 'Prepare agenda and materials for the team meeting',
    belongingListName: 'Work',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Research new technologies',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    description: 'Research and evaluate new technologies for upcoming project',
    belongingListName: 'List 1',
    isCompleted: false,
  },
];

export const initialCards: Card[] = [
  {
    id: 1,
    title: 'Welcome! 👋',
    content:
      'This is your sticky wall. Drag notes around, add new ones, and organize your thoughts!',
    color: 'hsl(200, 80%, 90%)',
    position: { x: 50, y: 50 },
  },
  {
    id: 2,
    title: 'Quick Tips 💡',
    content:
      '• Click and drag to move notes\n• Double click to edit\n• Click the + button to add new notes',
    color: 'hsl(120, 80%, 90%)',
    position: { x: 400, y: 50 },
  },
  {
    id: 3,
    title: 'Ideas Board 💭',
    content:
      'Use this space to jot down your ideas, tasks, or anything you want to remember!',
    color: 'hsl(280, 80%, 90%)',
    position: { x: 50, y: 300 },
  },
  {
    id: 4,
    title: 'To-Do List 📝',
    content:
      '1. Add more features\n2. Customize colors\n3. Add categories\n4. Export notes',
    color: 'hsl(40, 80%, 90%)',
    position: { x: 400, y: 300 },
  },
];
