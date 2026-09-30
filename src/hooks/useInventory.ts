import { useState, useCallback, useMemo } from 'react';
import { generateMockProducts } from '../data/mockProducts';
import { Product, StockStatus } from '../types/product';

export interface NewProductPayload {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export function useInventory(initialCount = 5000) {
  const initialData = useMemo(() => generateMockProducts(initialCount), [initialCount]);

  const [productsById, setProductsById] = useState<Record<string, Product>>(() => {
    return initialData.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as Record<string, Product>);
  });

  const [allIds, setAllIds] = useState<string[]>(() => initialData.map((p) => p.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [updateCount, setUpdateCount] = useState(0);

  const getUpdatedStatus = (stock: number): StockStatus => {
    if (stock <= 0) return 'OUT_OF_STOCK';
    if (stock <= 5) return 'LOW_STOCK';
    return 'IN_STOCK';
  };

  const handleUpdateStock = useCallback((id: string, delta: number) => {
    setProductsById((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const nextStock = Math.max(0, current.stock + delta);
      if (nextStock === current.stock) return prev;

      return {
        ...prev,
        [id]: {
          ...current,
          stock: nextStock,
          status: getUpdatedStatus(nextStock),
          updatedAt: new Date().toLocaleTimeString('id-ID'),
          lastUpdatedTimestamp: Date.now(),
        },
      };
    });
    setUpdateCount((c) => c + 1);
  }, []);

  const handleAddProduct = useCallback((productData: NewProductPayload) => {
    setAllIds((prevIds) => {
      const newIdNumber = prevIds.length + 1;
      const newId = `PROD-${newIdNumber.toString().padStart(5, '0')}`;
      const newSku = `SKU-${productData.category.slice(0, 3).toUpperCase()}-${newIdNumber.toString().padStart(5, '0')}`;
      const now = Date.now();

      const createdProduct: Product = {
        id: newId,
        name: productData.name,
        sku: newSku,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
        status: productData.stock <= 0 ? 'OUT_OF_STOCK' : productData.stock <= 5 ? 'LOW_STOCK' : 'IN_STOCK',
        updatedAt: new Date(now).toLocaleTimeString('id-ID'),
        lastUpdatedTimestamp: now,
      };

      setProductsById((prevById) => ({
        [newId]: createdProduct,
        ...prevById,
      }));

      return [newId, ...prevIds];
    });
  }, []);

  // 5. Filter Memoized berdasarkan Search Term
  const filteredIds = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return allIds;

    return allIds.filter((id) => {
      const product = productsById[id];
      if (!product) return false;

      return (
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.id.toLowerCase().includes(term)
      );
    });
  }, [allIds, productsById, searchTerm]);

  return {
    allIds,
    filteredIds,
    productsById,
    searchTerm,
    setSearchTerm,
    updateCount,
    handleUpdateStock,
    handleAddProduct,
  };
}
