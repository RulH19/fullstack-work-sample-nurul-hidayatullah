import React, { useState } from 'react';
import { PackagePlus, X } from 'lucide-react';
import { Button } from './ui/Button';
import { TextField } from './ui/TextField';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: {
    name: string;
    category: string;
    price: number;
    stock: number;
  }) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState<number>(250000);
  const [stock, setStock] = useState<number>(10);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      category,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
    });

    setName('');
    setPrice(250000);
    setStock(10);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-content-primary/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-surface-card border border-border-subtle rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-header">
          <div className="flex items-center gap-2 text-content-primary font-bold text-sm">
            <div className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand">
              <PackagePlus className="w-4 h-4" />
            </div>
            <span>Tambah Produk Baru</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            title="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <TextField
            label="Nama Produk"
            required
            placeholder="Contoh: Wireless Mechanical Keyboard Pro"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-surface-input focus:bg-surface-card border border-border-subtle focus:border-brand rounded-lg text-content-primary focus:outline-none transition"
            >
              <option value="Electronics">Electronics</option>
              <option value="Gaming & Accessories">Gaming & Accessories</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Harga (Rp)"
              type="number"
              min="1000"
              step="5000"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <TextField
              label="Jumlah Stok"
              type="number"
              min="0"
              max="9999"
              required
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border-subtle">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Simpan Produk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
