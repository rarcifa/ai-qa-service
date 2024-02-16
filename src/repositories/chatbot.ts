import Documents from '#src/lib/db/models/document.js';
import { Document } from '#src/lib/interfaces/document.js';

/**
 * Repository object offering data access functions for managing queries in the database.
 *
 * @fileoverview This file encapsulates functions related to database operations, specifically for handling 'Query' entities.
 * @namespace service
 */
export const repository = {
  /**
   * Asynchronously creates a new document instance in the database.
   * This function takes a 'Document' object as input and persists it in the database using the 'Queries' model.
   *
   * @async
   * @param {Document} data - The 'Document' data object containing the information to be stored.
   * @returns {Promise<Document>} A promise that resolves with the newly created 'Document' instance after it's successfully added to the database.
   *
   * @example
   * const newDocumentData = { title: 'New Document', description: 'Details of the new document' };
   * repository.createDocument(newDocumentData)
   */
  createDocument: async (data: Document): Promise<Document> => {
    return Documents.create(data);
  },
};
