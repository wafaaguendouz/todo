export type IconName =
  | 'edit'
  | 'trash'
  | 'add'
  | 'chevron-right'
  | 'note'
  | 'today';

export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  description: string;
  belongingListName: string;
  isCompleted: boolean;
}

export interface TaskCategory {
  url: string;
  name: TimeFilterValue | string;
  iconName?: IconName;
  taskCount: number;
  categoryColor?: string;
}

export type TimeFilterValue = 'Today' | 'Upcoming';

export interface Card {
  id: number;
  title: string;
  content: string;
  color: string;
  position: {
    x: number;
    y: number;
  };
}
