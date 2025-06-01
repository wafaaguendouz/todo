import { useContext } from 'react';
import { StickyWallContext } from '../contexts/StickyWallContext';
import type { StickyWallContextType } from '../contexts/StickyWallContext';

export const useStickyWall = (): StickyWallContextType => {
  const context = useContext(StickyWallContext);
  if (!context) {
    throw new Error('useStickyWall must be used within a StickyWallProvider');
  }
  return context;
};
