import Dexie, { Table } from 'dexie';
import { Quote } from './types';

export class QuoteDatabase extends Dexie {
  quotes!: Table<Quote>;

  constructor() {
    super('KineticQuotesDB');
  }
}

export const db = new QuoteDatabase();

// Move version definition outside constructor to avoid TypeScript 'property does not exist' error
db.version(1).stores({
  quotes: '++id, createdAt, author, theme'
});