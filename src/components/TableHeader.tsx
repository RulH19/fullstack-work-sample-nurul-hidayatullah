import React from 'react';

export const TableHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-surface-header border-b border-border-subtle text-xs font-semibold text-content-secondary uppercase tracking-wider">
      <div className="min-w-[260px] max-w-[340px]">Produk & Kategori</div>
      <div className="w-[130px] text-right hidden sm:block">Harga Satuan</div>
      <div className="w-[120px] text-center">Status Stok</div>
      <div className="w-[90px] text-center hidden md:block">Update</div>
      <div className="w-[100px] text-right pr-2">Aksi Stok</div>
    </div>
  );
};
