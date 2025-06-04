import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

// Should run on edge runtime
export const edge = true;

// Stream the response
export const streaming = true;

// API route: /api/generate-tasks?task=TASK_VALUE
export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const task = searchParams.get('task');

  if (!task) {
    return new Response('No task provided', { status: 400 });
  }

  const result = await generateObject({
    model: openai('gpt-4o-mini', { structuredOutputs: true }),
    schema: z.array(
      z.object({
        task: z.string().describe('The subtask title'),
        description: z.string().describe('Details about the subtask'),
        deadline: z
          .string()
          .describe('Deadline in ISO 8601 format (e.g., 2025-06-10T00:00:00Z)'),
      })
    ),
    prompt: `Break down the following task into subtasks with clear deadlines and descriptions:\n\n"${task}"`,
    system:
      'You are a task planning assistant. For the given task, return an array of subtasks in structured JSON. Each subtask should have a title, a description, and a deadline in ISO 8601 string format.',
  });

  return result.toJsonResponse();
}
