import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { TextField } from './ui/TextField';

interface DashboardToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddProductClick: () => void;
}

export const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  searchTerm,
  onSearchChange,
  onAddProductClick,
}) => {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
      <TextField
        containerClassName="w-full sm:w-80"
        leftIcon={<Search className="w-4 h-4" />}
        placeholder="Cari nama, SKU, atau ID produk..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Button
        onClick={onAddProductClick}
        className="w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" />
        <span>Tambah Produk</span>
      </Button>
    </div>
  );
};
