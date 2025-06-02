import { useState } from 'react';
import OpenAI from 'openai';
import type { GeneratedTask } from './types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only use this in development
});

export const useTaskGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);

  const generateTasks = async (selectedList: string) => {
    setIsLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a task generation assistant. Given a user's request, break it down into actionable tasks. 
            Each task should have a title, description, and a reasonable due date. 
            Format your response as a JSON array of tasks with the following structure:
            [
              {
                "title": "Task title",
                "description": "Detailed task description",
                "dueDate": "YYYY-MM-DD"
              }
            ]`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const response = completion.choices[0].message.content;
      if (!response) throw new Error('No response from OpenAI');

      const parsedTasks = JSON.parse(response).tasks.map((task: any) => ({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate),
        list: selectedList || 'Personal',
      }));

      setGeneratedTasks(parsedTasks);
    } catch (error) {
      console.error('Error generating tasks:', error);
      // Fallback to mock tasks if API call fails
      const mockTasks: GeneratedTask[] = [
        {
          title: 'Research Berlin attractions',
          description:
            'Look up popular tourist spots, museums, and landmarks in Berlin',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
          list: selectedList || 'Personal',
        },
        {
          title: 'Book accommodation',
          description: 'Find and book a hotel or Airbnb in a central location',
          dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
          list: selectedList || 'Personal',
        },
      ];
      setGeneratedTasks(mockTasks);
    } finally {
      setIsLoading(false);
    }
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

  return {
    prompt,
    setPrompt,
    isLoading,
    generatedTasks,
    generateTasks,
    updateGeneratedTask,
  };
};
