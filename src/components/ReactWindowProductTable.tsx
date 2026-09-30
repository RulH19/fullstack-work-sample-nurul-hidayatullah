import React, { useMemo, useCallback } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { Product } from '../types/product';
import { ProductRow } from './ProductRow';
import { TableHeader } from './TableHeader';

interface ReactWindowProductTableProps {
  productIds: string[];
  productsById: Record<string, Product>;
  onUpdateStock: (id: string, delta: number) => void;
  height?: number;
}

interface ItemDataPayload {
  productIds: string[];
  productsById: Record<string, Product>;
  onUpdateStock: (id: string, delta: number) => void;
}

export const ReactWindowProductTable: React.FC<ReactWindowProductTableProps> = ({
  productIds,
  productsById,
  onUpdateStock,
  height = 560,
}) => {
  const itemData = useMemo<ItemDataPayload>(
    () => ({
      productIds,
      productsById,
      onUpdateStock,
    }),
    [productIds, productsById, onUpdateStock]
  );

  const VirtualRow = useCallback(
    ({ index, style, data }: ListChildComponentProps<ItemDataPayload>) => {
      const productId = data.productIds[index];
      const product = data.productsById[productId];
      if (!product) return null;

      return (
        <div style={style}>
          <ProductRow product={product} onUpdateStock={data.onUpdateStock} />
        </div>
      );
    },
    []
  );

  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl overflow-hidden shadow-sm">
      <TableHeader />

      <List
        height={height}
        itemCount={productIds.length}
        itemSize={64}
        width="100%"
        itemData={itemData}
      >
        {VirtualRow}
      </List>
    </div>
  );
};

export const MemoCallbackProductTable = ReactWindowProductTable;
