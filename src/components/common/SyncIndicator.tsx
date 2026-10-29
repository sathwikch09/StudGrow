import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useOfflineStore } from '../../store/useOfflineStore';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';

export const SyncIndicator: React.FC = () => {
  const { isOnline, syncStatus, pendingCount, toggleSimulationOffline, syncPendingEvents } = useOfflineStore();
  const language = useAppStore((s) => s.language);
  const t = translations[language].offlineStatus;

  const handleClick = () => {
    if (!isOnline) {
      toggleSimulationOffline();
    } else if (pendingCount > 0) {
      syncPendingEvents();
    } else {
      toggleSimulationOffline();
    }
  };

  return (
    <button
      onClick={handleClick}
      title={isOnline ? 'Online (Click to simulate offline mode)' : 'Offline mode (Click to go online)'}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
        !isOnline
          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
          : syncStatus === 'syncing'
          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
          : syncStatus === 'error'
          ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
      }`}
    >
      {!isOnline ? (
        <>
          <WifiOff className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>{t.offline} ({pendingCount} queued)</span>
        </>
      ) : syncStatus === 'syncing' ? (
        <>
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
          <span>{t.syncing}</span>
        </>
      ) : syncStatus === 'error' ? (
        <>
          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          <span>{t.retry}</span>
        </>
      ) : (
        <>
          <Wifi className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t.synced}</span>
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        </>
      )}
    </button>
  );
};
