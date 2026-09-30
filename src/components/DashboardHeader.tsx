import React from 'react';

interface DashboardHeaderProps {
  totalCount: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ totalCount }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-bg text-brand border border-brand-border">
            Live Inventory Management
          </span>
          <span className="text-xs text-content-secondary font-mono">Nurul Hidayatullah</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-content-primary tracking-tight flex items-center gap-2">
          <span>E-Commerce Real-time Inventory Dashboard</span>
        </h1>
        <p className="text-xs md:text-sm text-content-secondary mt-1">
          High-performance Virtualized Table dengan <strong>{totalCount.toLocaleString()} produk aktif</strong>.
        </p>
      </div>
    </header>
  );
};
