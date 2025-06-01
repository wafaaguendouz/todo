import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Trash,
  Edit,
  Plus as Add,
  ChevronRight,
  StickyNote as Note,
  Calendar as Today,
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const iconComponents: { [key: string]: LucideIcon } = {
  trash: Trash,
  edit: Edit,
  add: Add,
  'chevron-right': ChevronRight,
  note: Note,
  today: Today,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'var(--icon-color)',
  className,
  style,
}) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      style={style}
    />
  );
};

export default Icon;
