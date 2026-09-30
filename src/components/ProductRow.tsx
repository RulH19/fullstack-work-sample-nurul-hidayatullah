import React from 'react';
import { Product } from '../types/product';
import { Minus, Plus, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface ProductRowProps {
  product: Product;
  onUpdateStock: (id: string, delta: number) => void;
  renderCountRef?: React.MutableRefObject<number>;
}

export const PlainProductRow: React.FC<ProductRowProps> = ({
  product,
  onUpdateStock,
}) => {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div
      data-product-row="true"
      className="flex items-center justify-between px-4 py-2.5 h-[64px] border-b border-border-subtle hover:bg-surface-hover transition-colors duration-150 group"
    >
      <div className="flex items-center gap-3 min-w-[260px] max-w-[340px]">
        <div className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-xs font-mono text-brand font-bold shrink-0">
          {product.id.split('-')[1]}
        </div>
        <div className="truncate">
          <div className="text-sm font-semibold text-content-primary truncate group-hover:text-brand transition-colors">
            {product.name}
          </div>
          <div className="text-xs text-content-secondary flex items-center gap-2">
            <span className="font-mono">{product.sku}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>
        </div>
      </div>

      <div className="text-sm font-mono font-medium text-content-primary hidden sm:block w-[130px] text-right">
        Rp {product.price.toLocaleString('id-ID')}
      </div>

      <div className="w-[120px] flex justify-center">
        {isOutOfStock ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-status-outOfStockBg text-status-outOfStock border border-status-outOfStockBorder">
            <XCircle className="w-3.5 h-3.5" />
            Habis
          </span>
        ) : isLowStock ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-status-lowStockBg text-status-lowStock border border-status-lowStockBorder">
            <AlertCircle className="w-3.5 h-3.5" />
            Sisa {product.stock}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-status-inStockBg text-status-inStock border border-status-inStockBorder">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {product.stock} Tersedia
          </span>
        )}
      </div>

      <div className="text-xs font-mono text-content-muted hidden md:block w-[90px] text-center">
        {product.updatedAt}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => onUpdateStock(product.id, -1)}
          disabled={isOutOfStock}
          title="Kurangi Stok (Simulasi Pembelian)"
        >
          <Minus className="w-3.5 h-3.5" />
        </Button>

        <span className="w-8 text-center text-sm font-bold font-mono text-content-primary">
          {product.stock}
        </span>

        <Button
          size="icon"
          variant="primary"
          onClick={() => onUpdateStock(product.id, 1)}
          title="Tambah Stok (Restock)"
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

export const ProductRow: React.FC<ProductRowProps> = React.memo(
  PlainProductRow,
  (prevProps, nextProps) => {
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.stock === nextProps.product.stock &&
      prevProps.product.status === nextProps.product.status &&
      prevProps.product.updatedAt === nextProps.product.updatedAt &&
      prevProps.onUpdateStock === nextProps.onUpdateStock
    );
  }
);
