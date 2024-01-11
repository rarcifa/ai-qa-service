import Queries from '@lib/db/models/query';
import { Query } from '@lib/interfaces/query';

/**
 * Repository object offering data access functions for managing queries in the database.
 *
 * @fileoverview This file encapsulates functions related to database operations, specifically for handling 'Query' entities.
 * @namespace service
 */
export const repository = {
  /**
   * Asynchronously creates a new query instance in the database.
   * This function takes a 'Query' object as input and persists it in the database using the 'Queries' model.
   *
   * @async
   * @param {Query} data - The 'Query' data object containing the information to be stored.
   * @returns {Promise<Query>} A promise that resolves with the newly created 'Query' instance after it's successfully added to the database.
   *
   * @example
   * const newQueryData = { title: 'New Query', description: 'Details of the new query' };
   * repository.createQuery(newQueryData)
   */
  createQuery: async (data: Query): Promise<Query> => {
    return Queries.create(data);
  },
};
