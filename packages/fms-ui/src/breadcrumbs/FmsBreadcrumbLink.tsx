import type { ReactNode } from 'react';
import { FmsIconFrame, type FmsIconType } from '../icon-frame/FmsIconFrame';
import styles from './FmsBreadcrumbs.module.css';

export type FmsBreadcrumbLinkProps = {
  /** Figma Text */
  label: ReactNode;
  href?: string;
  /** Figma State=Current */
  current?: boolean;
  icon?: boolean;
  iconName?: string;
  iconType?: FmsIconType;
  className?: string;
};

/** Figma Breadcrumb Link — one segment. Compose via `FmsBreadcrumbs` `items` in product. */
export function FmsBreadcrumbLink({
  label,
  href,
  current = false,
  icon,
  iconName,
  iconType,
  className,
}: FmsBreadcrumbLinkProps) {
  const inner = (
    <span className={styles.itemLabel}>
      {icon && iconName ? (
        <FmsIconFrame
          name={iconName}
          type={iconType ?? 'regular'}
          tone="inherit"
          size={14}
        />
      ) : null}
      <span>{label}</span>
    </span>
  );

  if (current) {
    return (
      <span className={[styles.standaloneCurrent, className].filter(Boolean).join(' ')}>{inner}</span>
    );
  }

  return (
    <a href={href ?? '#'} className={[styles.standaloneLink, className].filter(Boolean).join(' ')}>
      {inner}
    </a>
  );
}