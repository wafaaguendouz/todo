import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

export const edge = true;
export const streaming = true;

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const task = searchParams.get('task');

  if (!task) {
    return new Response('No task provided', { status: 400 });
  }

  try {
    const result = await generateObject({
      model: openai('gpt-4o', { structuredOutputs: true }),
      schema: z.object({
        tasks: z.array(
          z.object({
            task: z.string().describe('The subtask title'),
            description: z.string().describe('Details about the subtask'),
            deadline: z.string().describe('ISO 8601 date format deadline'),
          })
        ),
      }),
      prompt: `Break down the following task into subtasks with clear deadlines and descriptions:\n\n"${task}"`,
      system:
        'You are a task planning assistant. For the given task, return an array of subtasks in structured JSON. Each subtask should have a title, a description, and a deadline after today in ISO 8601 string format.',
    });

    return result.toJsonResponse();
  } catch (err: any) {
    console.error('AI task generation failed:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
