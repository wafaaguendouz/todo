import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

// Should run on edge runtime
export const edge = true;

// Stream the response
export const streaming = true;

// This function is called via /api/generate-tasks?task=TASK_VALUE
export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const task = searchParams.get('task');

  if (!task) {
    return new Response('No task provided', { status: 400 });
  }

  const result = await generateObject({
    model: openai('o3-mini'),
    providerOptions: {
      openai: { reasoningEffort: 'medium' },
    },
    output: 'array',
    schema: z.object({
      task: z.string().describe('The task to be broken down'),
      description: z.string().describe('The description of the task'),
      deadline: z.date().describe('The deadline for the task'),
    }),
    prompt: task,
    system:
      'Break down the following task to a set of individual tasks with defined deadlines and descriptions',
  });

  return result.toJsonResponse();
}
