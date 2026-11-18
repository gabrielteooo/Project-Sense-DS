import type { HTMLAttributes } from 'react';
import styles from './FmsIconFrame.module.css';

export type FmsIconType = 'solid' | 'regular' | 'brand';

/** Default icon colour; `onDark` = white; `inherit` = parent / Ant slot colour. */
export type FmsIconTone = 'default' | 'primary' | 'onDark' | 'inherit';

/** Icon frame footprint — Figma x-small / small / base contexts. */
export type FmsIconFrameSize = 12 | 14 | 16;

const TYPE_TO_PREFIX: Record<FmsIconType, string> = {
  solid: 'fa-solid',
  regular: 'fa-regular',
  brand: 'fa-brands',
};

function normalizeIconName(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^fa-/, '')
    .replace(/\s+/g, '-');
}

/** Build Font Awesome 6 classes from Figma icon frame Type + icon name. */
export function fmsIconClass(type: FmsIconType, name: string) {
  const glyph = normalizeIconName(name);
  return `${TYPE_TO_PREFIX[type]} fa-${glyph}`;
}

export type FmsIconFrameProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Font Awesome glyph name (Figma “Icon name” / “Brand icon name”), e.g. `magnifying-glass`. */
  name?: string;
  /** Solid, Regular, or Brand — matches Figma Type. Default `regular`. */
  type?: FmsIconType;
  /** Pre-built FA classes; overrides `name` + `type` when set. */
  iconClass?: string;
  /** Standalone colour. Nested in Button, Alert, etc. use `inherit`. */
  tone?: FmsIconTone;
  /** Apply `colorIconHover` on hover (Figma Hover variant). Default false. */
  hoverable?: boolean;
  /** Glyph size in px (`12` | `14` | `16`). Omit when nesting so parent control height sets size. */
  size?: FmsIconFrameSize;
};

/**
 * FMS icon frame — Font Awesome 6 Pro glyph from the design-system kit.
 * Standalone: `tone="default"` (`colorIcon`) or `onDark` (white).
 * Composed: `tone="inherit"` so parent tokens set colour.
 */
export function FmsIconFrame({
  name,
  type = 'regular',
  iconClass,
  tone = 'default',
  hoverable = false,
  size,
  className,
  style,
  ...rest
}: FmsIconFrameProps) {
  const resolvedClass =
    iconClass?.trim() || (name ? fmsIconClass(type, name) : undefined);

  if (!resolvedClass) {
    return null;
  }

  const toneClass =
    tone === 'onDark'
      ? styles.onDark
      : tone === 'primary'
        ? styles.primaryTone
        : tone === 'inherit'
          ? styles.inherit
          : styles.defaultTone;

  return (
    <i
      {...rest}
      style={{ ...(size != null ? { fontSize: size } : undefined), ...style }}
      className={[
        resolvedClass,
        styles.frame,
        toneClass,
        tone === 'default' && hoverable ? styles.hoverable : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden={rest['aria-label'] ? undefined : true}
    />
  );
}