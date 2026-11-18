import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import type { ReactNode } from 'react';
import styles from './FmsBadge.module.css';

/** Figma Colour */
export type FmsBadgeColorVariant = 'default' | 'primary';

/** Figma Type Base / Small (numeric badge). */
export type FmsBadgeSize = 'base' | 'small';

export type FmsBadgeProps = Omit<BadgeProps, 'size' | 'color' | 'status'> & {
  /**
   * Figma Colour — `default` is error/red counts; `primary` is teal informational counts.
   * @default 'default'
   */
  colorVariant?: FmsBadgeColorVariant;
  /**
   * Figma Type Base vs Small for numeric badges (`dot` ignores size styling for the indicator).
   * @default 'base'
   */
  size?: FmsBadgeSize;
  /** Figma Type=Dot */
  dot?: boolean;
  count?: ReactNode;
  /** @default 99 — Figma `99+` overflow samples */
  overflowCount?: number;
  showZero?: boolean;
  children?: ReactNode;
  className?: string;
  rootClassName?: string;
};

function antSize(size: FmsBadgeSize): BadgeProps['size'] {
  return size === 'small' ? 'small' : 'default';
}

/**
 * FMS Badge — Ant Design `Badge` with Figma Default/Primary colours and Base/Small/Dot types.
 * Wrap icons, avatars, or buttons for notification counts; omit `children` for a standalone pill.
 */
export function FmsBadge({
  colorVariant = 'default',
  size = 'base',
  dot,
  count,
  overflowCount = 99,
  showZero,
  children,
  className,
  rootClassName,
  ...rest
}: FmsBadgeProps) {
  const toneClass =
    colorVariant === 'primary' ? styles.colorPrimary : styles.colorDefault;

  return (
    <Badge
      {...rest}
      dot={dot}
      count={dot ? undefined : count}
      overflowCount={overflowCount}
      showZero={showZero}
      size={antSize(size)}
      className={[styles.fmsBadge, toneClass, className].filter(Boolean).join(' ')}
      rootClassName={rootClassName}
    >
      {children}
    </Badge>
  );
}