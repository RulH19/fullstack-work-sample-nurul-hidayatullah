import React from 'react';
import { Layers, Cpu, Activity, AlertTriangle } from 'lucide-react';
import { OptimizationMode } from '../types/optimization';

interface MetricCardsProps {
  totalDataset: number;
  updateCount: number;
  mode?: OptimizationMode;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalDataset,
  updateCount,
  mode = 'full-optimized',
}) => {
  const [realDomRowCount, setRealDomRowCount] = React.useState<number>(0);

  React.useEffect(() => {
    const measureLiveDOM = () => {
      const elements = document.querySelectorAll('[data-product-row]');
      setRealDomRowCount(elements.length);
    };

    measureLiveDOM();

    const frameId = requestAnimationFrame(measureLiveDOM);
    const timerId = setTimeout(measureLiveDOM, 60);

    window.addEventListener('scroll', measureLiveDOM, true);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
      window.removeEventListener('scroll', measureLiveDOM, true);
    };
  }, [mode, totalDataset, updateCount]);

  const isHeavyDom = realDomRowCount > 50;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm">
        <div className="text-xs font-medium text-content-secondary flex items-center justify-between">
          <span>Total Dataset</span>
          <Layers className="w-4 h-4 text-brand" />
        </div>
        <div className="text-xl md:text-2xl font-bold font-mono text-content-primary mt-1">
          {totalDataset.toLocaleString()}{' '}
          <span className="text-xs text-content-secondary font-normal">Item</span>
        </div>
      </div>

      <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm">
        <div className="text-xs font-medium text-content-secondary flex items-center justify-between">
          <span>DOM Baris di Layar</span>
          {isHeavyDom ? (
            <AlertTriangle className="w-4 h-4 text-status-outOfStock" />
          ) : (
            <Cpu className="w-4 h-4 text-status-inStock" />
          )}
        </div>
        <div
          className={`text-xl md:text-2xl font-bold font-mono mt-1 ${isHeavyDom ? 'text-status-outOfStock' : 'text-status-inStock'
            }`}
        >
          {realDomRowCount > 0 ? `${realDomRowCount.toLocaleString()} Nodes` : 'Mengukur...'}
        </div>
      </div>

      <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm">
        <div className="text-xs font-medium text-content-secondary flex items-center justify-between">
          <span>Total Realtime Update</span>
          <Activity className="w-4 h-4 text-brand" />
        </div>
        <div className="text-xl md:text-2xl font-bold font-mono text-content-primary mt-1">
          {updateCount.toLocaleString()}{' '}
          <span className="text-xs text-content-secondary font-normal">Events</span>
        </div>
      </div>
    </div>
  );
};
