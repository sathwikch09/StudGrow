import { openDB, DBSchema } from 'idb';
import { Concept, OfflineSyncEvent } from '../types';

interface StudGrowDB extends DBSchema {
  concepts: {
    key: string;
    value: Concept;
  };
  offline_events: {
    key: string;
    value: OfflineSyncEvent;
    indexes: { 'by-synced': boolean };
  };
  settings: {
    key: string;
    value: any;
  };
}

const DB_NAME = 'studgrow_offline_v1';
const DB_VERSION = 1;

export async function initDatabase() {
  return openDB<StudGrowDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('concepts')) {
        db.createObjectStore('concepts', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('offline_events')) {
        const eventStore = db.createObjectStore('offline_events', { keyPath: 'id' });
        eventStore.createIndex('by-synced', 'synced');
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
      }
    },
  });
}

export async function saveConceptsToOfflineStorage(concepts: Concept[]): Promise<void> {
  const db = await initDatabase();
  const tx = db.transaction('concepts', 'readwrite');
  for (const c of concepts) {
    await tx.store.put(c);
  }
  await tx.done;
}

export async function getOfflineConcept(id: string): Promise<Concept | undefined> {
  const db = await initDatabase();
  return db.get('concepts', id);
}

export async function queueOfflineAnswerEvent(event: OfflineSyncEvent): Promise<void> {
  const db = await initDatabase();
  await db.put('offline_events', event);
}

export async function getPendingEvents(): Promise<OfflineSyncEvent[]> {
  const db = await initDatabase();
  const allEvents = await db.getAll('offline_events');
  return allEvents.filter(e => !e.synced);
}

export async function markEventsAsSynced(eventIds: string[]): Promise<void> {
  const db = await initDatabase();
  const tx = db.transaction('offline_events', 'readwrite');
  for (const id of eventIds) {
    const item = await tx.store.get(id);
    if (item) {
      item.synced = true;
      await tx.store.put(item);
    }
  }
  await tx.done;
}
