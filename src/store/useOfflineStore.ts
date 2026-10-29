import { create } from 'zustand';
import { SyncStatus, OfflineSyncEvent } from '../types';
import {
  queueOfflineAnswerEvent,
  getPendingEvents,
  markEventsAsSynced,
} from '../services/db';

interface OfflineState {
  isOnline: boolean;
  syncStatus: SyncStatus;
  pendingCount: number;
  lastSyncedAt: string;

  // Actions
  setOnlineStatus: (online: boolean) => void;
  toggleSimulationOffline: () => void;
  recordOfflineAnswer: (event: Omit<OfflineSyncEvent, 'id' | 'timestamp' | 'synced'>) => Promise<void>;
  syncPendingEvents: () => Promise<void>;
  checkPendingCount: () => Promise<void>;
}

export const useOfflineStore = create<OfflineState>((set, get) => {
  // Listen to browser network status
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      get().setOnlineStatus(true);
      get().syncPendingEvents();
    });
    window.addEventListener('offline', () => {
      get().setOnlineStatus(false);
    });
  }

  return {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    syncStatus: 'synced',
    pendingCount: 0,
    lastSyncedAt: 'Just now',

    setOnlineStatus: (online: boolean) => {
      set({
        isOnline: online,
        syncStatus: online ? (get().pendingCount > 0 ? 'syncing' : 'synced') : 'offline',
      });
      if (online) {
        get().syncPendingEvents();
      }
    },

    toggleSimulationOffline: () => {
      const next = !get().isOnline;
      get().setOnlineStatus(next);
    },

    recordOfflineAnswer: async (eventData) => {
      const event: OfflineSyncEvent = {
        ...eventData,
        id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        timestamp: new Date().toISOString(),
        synced: get().isOnline,
      };

      try {
        await queueOfflineAnswerEvent(event);
        if (!get().isOnline) {
          set((state) => ({
            pendingCount: state.pendingCount + 1,
            syncStatus: 'offline',
          }));
        } else {
          // If online, mock immediate sync
          set({ syncStatus: 'synced', lastSyncedAt: 'Just now' });
        }
      } catch (err) {
        console.error('Failed to store offline event:', err);
      }
    },

    syncPendingEvents: async () => {
      if (!get().isOnline) return;

      try {
        set({ syncStatus: 'syncing' });
        const pending = await getPendingEvents();
        if (pending.length === 0) {
          set({ syncStatus: 'synced', pendingCount: 0 });
          return;
        }

        // Mock network delay with backoff
        await new Promise((r) => setTimeout(r, 1200));

        const ids = pending.map((e) => e.id);
        await markEventsAsSynced(ids);

        set({
          syncStatus: 'synced',
          pendingCount: 0,
          lastSyncedAt: 'Just now',
        });
      } catch (err) {
        console.error('Sync failed:', err);
        set({ syncStatus: 'error' });
      }
    },

    checkPendingCount: async () => {
      try {
        const pending = await getPendingEvents();
        set({ pendingCount: pending.length });
      } catch {
        // DB not yet ready
      }
    },
  };
});
