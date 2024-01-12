import { logger } from '#src/helpers/logger.js';
import OpenAI from 'openai';

import { OPENAI_API_KEY } from '#src/helpers/constants.js';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

/**
 * Asynchronously sends a context string to OpenAI's GPT-4 model and retrieves a response.
 * Handles API requests and manages errors, returning the response content or null in case of an error.
 *
 * @param {string} context - The context or prompt to send to the OpenAI GPT-4 model.
 * @returns {Promise<string|null>} A promise resolving to the GPT-4 response content or null if an error occurs.
 *
 * @example
 * const response = await openAI('Describe the process of photosynthesis.');
 */
export const openAI = async (context: string): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: context }],
      model: 'gpt-4',
      temperature: 1,
    });
    return completion.choices[0].message.content;
  } catch (e) {
    logger.error(`[openAI] openAI API: ${e.message}`);
    return null;
  }
};
