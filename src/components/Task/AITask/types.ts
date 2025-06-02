export interface GeneratedTask {
  title: string;
  description: string;
  dueDate: Date;
  list: string;
}

export interface AITaskProps {
  closeModal: () => void;
  addTask: (
    taskTitle: string,
    dueDate: Date,
    description: string,
    list: string
  ) => void;
}
