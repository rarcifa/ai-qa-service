import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { VectorStoreRetriever } from '@langchain/core/vectorstores';
import { OpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { loadQARefineChain, RetrievalQAChain } from 'langchain/chains';
import { ChainValues } from 'langchain/dist/schema';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { logger } from '@helpers/logger';

import { VECTOR_STORE_PATH } from '@helpers/constants';

const DEFAULT_MODEL = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  maxTokens: -1,
});

/**
 * Helpers for managing langchain requests.
 *
 * @fileoverview This file provides helper functions for managing langchain requests.
 * @namespace langchain
 */
export const langchain = {
  /**
   * Creates a DirectoryLoader instance for loading local files.
   * This function initializes loaders for JSON and text files.
   *
   * @returns {DirectoryLoader} An instance of DirectoryLoader configured for '.json' and '.txt' files.
   *
   * @example
   * const loader = langchain.createLoader();
   */
  createLoader: (): DirectoryLoader => {
    return new DirectoryLoader('./src/integrations/docs', {
      '.json': (path) => new JSONLoader(path),
      '.txt': (path) => new TextLoader(path),
    });
  },

  /**
   * Normalizes the content of the provided documents.
   * Converts the 'pageContent' property of each document into a string.
   *
   * @param {any[]} docs - An array of documents with a 'pageContent' property to normalize.
   * @returns {string[]} An array of normalized document content as strings.
   *
   * @example
   * const normalizedDocs = langchain.normalizeDocuments(documents);
   */
  normalizeDocuments: (docs: any[]): string[] => {
    return docs.map((doc) => {
      if (typeof doc.pageContent === 'string') {
        return doc.pageContent;
      } else if (Array.isArray(doc.pageContent)) {
        return doc.pageContent.join('\n');
      }
    });
  },

  /**
   * Asynchronously creates a vector store from the provided documents.
   * Normalizes the documents and splits them into chunks before creating the store.
   *
   * @async
   * @param {any[]} docs - An array of documents to create the vector store from.
   * @returns {Promise<HNSWLib>} A promise that resolves to an HNSWLib vector store.
   *
   * @example
   * const vectorStore = await langchain.createVectorStore(documents);
   */
  createVectorStore: async (docs: any[]): Promise<HNSWLib> => {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });

    const normalizedDocs = langchain.normalizeDocuments(docs);
    const splitDocs = await textSplitter.createDocuments(normalizedDocs);

    return HNSWLib.fromDocuments(splitDocs, new OpenAIEmbeddings());
  },

  /**
   * Creates a RetrievalQAChain for querying.
   * Combines document retrieval with QA refinement.
   *
   * @param {OpenAI} model - An instance of the OpenAI language model.
   * @param {VectorStoreRetriever<HNSWLib>} retriever - A retriever instance for document retrieval.
   * @returns {RetrievalQAChain} An instance of RetrievalQAChain.
   *
   * @example
   * const retrievalChain = langchain.createRetrievalChain(modelInstance, vectorStoreRetriever);
   */
  createRetrievalChain: (model: OpenAI, retriever: VectorStoreRetriever<HNSWLib>): RetrievalQAChain => {
    return new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model),
      retriever,
    });
  },

  /**
   * Asynchronously retrieves information based on the provided query.
   * Loads documents, processes them, and queries the retrieval chain.
   *
   * This function orchestrates several steps:
   *
   * [1] Loading documents from a specified directory.
   * [2] Initializing the OpenAI language model with specific configurations.
   * [3] Creating a vector store from the loaded documents.
   * [4] Saving the vector store to a predefined path.
   * [5] Creating a retrieval QA chain using the model and the vector store.
   * [6] Querying the chain with the provided parameters and returning the response.
   *
   * @async
   * @param {string} params - The query parameters as a string.
   * @returns {Promise<ChainValues>} A promise resolving to the query response.
   *
   * @example
   * const response = await langchain.retrieveChain('What is the capital of France?');
   */
  retrieveChain: async (params: string): Promise<ChainValues> => {
    try {
      const query = `Answer the question based on the context below, and if the question can't be answered based on the context, say "I don't know". Always use markdown for your response. The context is hidden to the user, so don't mention sections. Question: ${params}`;
      logger.info('Prompt:', params);

      /* [1] Loading documents from a specified directory. */
      logger.info('Loading docs...');
      const loader = langchain.createLoader();
      const docs = await loader.load();

      /* [2] Initializing the OpenAI language model with specific configurations. */
      logger.info('Processing...');
      const model = DEFAULT_MODEL;

      /* [3] Creating a vector store from the loaded documents. */
      logger.info('Creating new vector store...');
      const vectorStore = await langchain.createVectorStore(docs);

      /* [4] Saving the vector store to a predefined path. */
      await vectorStore.save(VECTOR_STORE_PATH);
      logger.info('Vector store created.');

      /* [5] Creating a retrieval QA chain using the model and the vector store. */
      logger.info('Creating retrieval chain...');
      const chain = langchain.createRetrievalChain(model, vectorStore.asRetriever());

      /* [6] Querying the chain with the provided parameters and returning the response. */
      logger.info('Querying chain...');
      const res = await chain.call({ query });
      logger.info(JSON.stringify(res, null, 2));

      return res;
    } catch (e) {
      logger.error(e);
    }
  },
};
