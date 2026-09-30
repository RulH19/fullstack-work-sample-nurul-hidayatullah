import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Product } from '../types/product';
import { ProductRow } from './ProductRow';
import { TableHeader } from './TableHeader';

interface OptimizedProductTableProps {
  productIds: string[];
  productsById: Record<string, Product>;
  onUpdateStock: (id: string, delta: number) => void;
  height?: number;
}

export const OptimizedProductTable: React.FC<OptimizedProductTableProps> = ({
  productIds,
  productsById,
  onUpdateStock,
  height = 560,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: productIds.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 0,
  });

  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl overflow-hidden shadow-sm">
      <TableHeader />

      <div
        ref={parentRef}
        style={{ height: `${height}px`, overflow: 'auto' }}
        className="relative"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const productId = productIds[virtualRow.index];
            const product = productsById[productId];

            if (!product) return null;

            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <ProductRow product={product} onUpdateStock={onUpdateStock} />
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};
