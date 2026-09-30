export type OptimizationMode =
  | 'vanilla'
  | 'memo-callback'
  | 'full-optimized';

export interface ModeConfig {
  id: OptimizationMode;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  features: {
    virtualizer: boolean;
    useMemo: boolean;
    useCallback: boolean;
    reactMemo: boolean;
  };
  domNodes: string;
  statusColor: 'danger' | 'warning' | 'success';
}

export const OPTIMIZATION_MODES: Record<OptimizationMode, ModeConfig> = {
  vanilla: {
    id: 'vanilla',
    name: '1. Vanilla (No Virtualization)',
    shortName: 'Vanilla (5.000 Raw DOM)',
    badge: 'Unoptimized',
    description: 'Murni tanpa virtualisasi: 5.000 raw DOM dirender langsung ke browser sekaligus (Layout Reflow berat & lag).',
    features: {
      virtualizer: false,
      useMemo: false,
      useCallback: false,
      reactMemo: false,
    },
    domNodes: '5.000+ Nodes',
    statusColor: 'danger',
  },
  'memo-callback': {
    id: 'memo-callback',
    name: '2. react-window (FixedSizeList)',
    shortName: 'react-window',
    badge: 'Component Virtualizer',
    description: 'Virtualisasi klasik menggunakan react-window (FixedSizeList). Cepat (~12 DOM), namun arsitektur kaku berbasis komponen wrapper.',
    features: {
      virtualizer: true,
      useMemo: true,
      useCallback: true,
      reactMemo: true,
    },
    domNodes: '~12 Nodes',
    statusColor: 'warning',
  },
  'full-optimized': {
    id: 'full-optimized',
    name: '3. @tanstack/react-virtual (useVirtualizer)',
    shortName: 'useVirtualizer',
    badge: 'Headless Hook (60 FPS)',
    description: 'Virtualisasi modern menggunakan @tanstack/react-virtual (useVirtualizer). Headless Hook, bundle lebih ramping (~3.8 KB), dan kompatibel React 18/19.',
    features: {
      virtualizer: true,
      useMemo: true,
      useCallback: true,
      reactMemo: true,
    },
    domNodes: '~12 Nodes',
    statusColor: 'success',
  },
};
