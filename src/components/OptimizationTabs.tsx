import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { OptimizationMode, OPTIMIZATION_MODES } from '../types/optimization';

interface OptimizationTabsProps {
  activeMode: OptimizationMode;
  onModeChange: (mode: OptimizationMode) => void;
}

export const OptimizationTabs: React.FC<OptimizationTabsProps> = ({
  activeMode,
  onModeChange,
}) => {

  const modesList = Object.values(OPTIMIZATION_MODES);

  return (
    <div className="space-y-3">
      <div className="bg-surface-card border border-border-subtle rounded-xl p-1.5 flex flex-wrap gap-1 shadow-sm">
        {modesList.map((mode) => {
          const isActive = activeMode === mode.id;

          return (
            <Button
              key={mode.id}
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onModeChange(mode.id)}
              className={`flex-1 min-w-[140px] sm:min-w-0 ${isActive ? 'scale-[1.01]' : ''
                }`}
            >
              {mode.id === 'full-optimized' && <Sparkles className="w-3.5 h-3.5 shrink-0" />}
              {mode.id === 'vanilla' && <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />}
              <span>{mode.shortName}</span>
            </Button>
          );
        })}
      </div>


    </div>
  );
};

