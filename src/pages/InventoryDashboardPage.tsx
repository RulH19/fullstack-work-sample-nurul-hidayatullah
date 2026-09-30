import React, { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { DashboardHeader } from '../components/DashboardHeader';
import { OptimizationTabs } from '../components/OptimizationTabs';
import { MetricCards } from '../components/MetricCards';
import { DashboardToolbar } from '../components/DashboardToolbar';
import { VanillaProductTable } from '../components/VanillaProductTable';
import { ReactWindowProductTable } from '../components/ReactWindowProductTable';
import { OptimizedProductTable } from '../components/OptimizedProductTable';
import { AddProductModal } from '../components/AddProductModal';
import { OptimizationMode } from '../types/optimization';

export const InventoryDashboardPage: React.FC = () => {
  const {
    allIds,
    filteredIds,
    productsById,
    searchTerm,
    setSearchTerm,
    updateCount,
    handleUpdateStock,
    handleAddProduct,
  } = useInventory();

  const [optimizationMode, setOptimizationMode] = useState<OptimizationMode>('full-optimized');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const displayProductIds =
    optimizationMode === 'vanilla'
      ? (searchTerm.trim()
          ? allIds.filter((id) => {
              const p = productsById[id];
              if (!p) return false;
              const term = searchTerm.toLowerCase();
              return (
                p.name.toLowerCase().includes(term) ||
                p.sku.toLowerCase().includes(term) ||
                p.id.toLowerCase().includes(term)
              );
            })
          : allIds)
      : filteredIds;

  return (
    <div className="min-h-screen bg-surface-app text-content-primary p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <DashboardHeader totalCount={allIds.length} />

        <OptimizationTabs
          activeMode={optimizationMode}
          onModeChange={setOptimizationMode}
        />

        <MetricCards
          totalDataset={allIds.length}
          updateCount={updateCount}
          mode={optimizationMode}
        />

        <DashboardToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddProductClick={() => setIsAddModalOpen(true)}
        />

        <main>
          {optimizationMode === 'vanilla' && (
            <VanillaProductTable
              productIds={displayProductIds}
              productsById={productsById}
              onUpdateStock={handleUpdateStock}
            />
          )}

          {optimizationMode === 'memo-callback' && (
            <ReactWindowProductTable
              productIds={displayProductIds}
              productsById={productsById}
              onUpdateStock={handleUpdateStock}
            />
          )}

          {optimizationMode === 'full-optimized' && (
            <OptimizedProductTable
              productIds={displayProductIds}
              productsById={productsById}
              onUpdateStock={handleUpdateStock}
            />
          )}
        </main>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};
