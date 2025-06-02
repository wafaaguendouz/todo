// Should run on edge runtime
export const edge = true;

// Stream the response
export const streaming = true;

export default async function handler() {
  return new Response('Edge Function: OK', {
    status: 200,
  });
}
