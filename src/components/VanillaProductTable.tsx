import React from 'react';
import { Product } from '../types/product';
import { PlainProductRow } from './ProductRow';
import { TableHeader } from './TableHeader';

interface VanillaProductTableProps {
  productIds: string[];
  productsById: Record<string, Product>;
  onUpdateStock: (id: string, delta: number) => void;
  height?: number;
}


export const VanillaProductTable: React.FC<VanillaProductTableProps> = ({
  productIds,
  productsById,
  onUpdateStock,
  height = 560,
}) => {
  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl overflow-hidden shadow-sm">
      <TableHeader />

      <div
        style={{ height: `${height}px`, overflow: 'auto' }}
        className="relative divide-y divide-border-subtle"
      >
        {productIds.map((productId) => {
          const product = productsById[productId];
          if (!product) return null;

          return (
            <PlainProductRow
              key={productId}
              product={product}
              onUpdateStock={(id, delta) => onUpdateStock(id, delta)}
            />
          );
        })}
      </div>


    </div>
  );
};
