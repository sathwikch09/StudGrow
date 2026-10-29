import React, { useState } from 'react';
import { BookOpen, Video, FileText, Download, Check, Search, WifiOff, HardDrive } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { LibraryResource } from '../../types';

export const LibraryPage: React.FC = () => {
  const library = useAppStore((s) => s.library);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(
    new Set(library.filter((l) => l.isOfflineCached).map((l) => l.id))
  );

  const filtered = library.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const toggleDownload = (id: string) => {
    const next = new Set(downloadedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setDownloadedIds(next);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Digital Study Library & Offline Vault
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            E-books, formulas, video explanations, and previous year papers saved to device storage
          </p>
        </div>

        {/* Offline cached count badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <HardDrive className="w-4 h-4" />
          <span>{downloadedIds.size} Items Cached in IndexedDB</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { key: 'all', label: 'All Resources' },
            { key: 'ebook', label: 'E-Books' },
            { key: 'notes', label: 'Revision Notes' },
            { key: 'video', label: 'Video Lessons' },
            { key: 'paper', label: 'Past Papers' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === tab.key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, notes..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isDownloaded = downloadedIds.has(item.id);

          return (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    {item.type === 'video' ? (
                      <Video className="w-5 h-5" />
                    ) : item.type === 'ebook' ? (
                      <BookOpen className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-[11px] text-slate-400 font-mono">
                  {item.subjectName} • Class {item.classGrade}
                  {item.fileSize ? ` • ${item.fileSize}` : ` • ${item.duration}`}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">
                  {item.downloadsCount} downloads
                </span>

                <button
                  onClick={() => toggleDownload(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                    isDownloaded
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Cached</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
