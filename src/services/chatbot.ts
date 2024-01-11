import { langchain } from '@integrations/langchain-api';
import { ChainValues } from 'langchain/dist/schema';

/**
 * Service object for handling query-related operations.
 *
 * @fileoverview This file encapsulates functions related to the processing and management of query requests, particularly utilizing the langchain library.
 * @namespace service
 */
export const service = {
  /**
   * Asynchronously generates a query using the langchain library.
   * This function takes a string query as input and utilizes langchain's `retrieveChain` method to process and retrieve relevant information.
   *
   * @async
   * @param {string} query - The query string to be processed.
   * @returns {Promise<ChainValues>} A promise that resolves with the result of the langchain retrieval process, typically containing the processed query information.
   *
   * @example
   * service.generateQuery('What is the tallest building in the world?')
   */
  generateQuery: async (query: string): Promise<ChainValues> => {
    return await langchain.retrieveChain(query);
  },
};
