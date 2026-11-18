import { Breadcrumb } from 'antd';
import type { BreadcrumbProps, ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import type { ReactNode } from 'react';
import { FmsIconFrame, type FmsIconType } from '../icon-frame/FmsIconFrame';
import styles from './FmsBreadcrumbs.module.css';

export type FmsBreadcrumbItem = {
  key?: React.Key;
  /** Figma Text / visible label */
  label: ReactNode;
  /** Navigable segment (Figma State=Default \| Hover). Omit for current page. */
  href?: string;
  /** Figma State=Current — current location, not a link */
  current?: boolean;
  /** Figma Icon boolean */
  icon?: boolean;
  /** Font Awesome glyph for leading icon frame (e.g. `house`) */
  iconName?: string;
  iconType?: FmsIconType;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
};

export type FmsBreadcrumbsProps = Omit<BreadcrumbProps, 'items' | 'routes' | 'children'> & {
  items: FmsBreadcrumbItem[];
  /** Figma Breadcrumb Separator. Default `/`. */
  separator?: ReactNode;
};

function itemTitle(item: FmsBreadcrumbItem) {
  return (
    <span className={styles.itemLabel}>
      {item.icon && item.iconName ? (
        <FmsIconFrame
          name={item.iconName}
          type={item.iconType ?? 'regular'}
          tone="inherit"
          size={14}
        />
      ) : null}
      <span>{item.label}</span>
    </span>
  );
}

function toAntItems(items: FmsBreadcrumbItem[]): ItemType[] {
  return items.map((item, index) => {
    const isLast = index === items.length - 1;
    const isCurrent = item.current ?? (isLast && item.href == null);
    const title = itemTitle(item);

    if (isCurrent) {
      return { key: item.key ?? index, title };
    }

    return {
      key: item.key ?? index,
      title,
      href: item.href,
      onClick: item.onClick,
    };
  });
}

/**
 * FMS Breadcrumbs — Ant Design `Breadcrumb` with Figma link + `/` separator styling.
 * Hover uses `colorBgTextHover`; current item uses `lastItemColor`.
 */
export function FmsBreadcrumbs({
  items,
  separator = '/',
  className,
  ...rest
}: FmsBreadcrumbsProps) {
  return (
    <Breadcrumb
      {...rest}
      separator={separator}
      items={toAntItems(items)}
      className={[styles.fmsBreadcrumb, className].filter(Boolean).join(' ')}
    />
  );
}