import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** When set, shows a colour swatch before the label (Figma 58:15689). */
  swatchHex?: string;
  /** Primary brand fill — e.g. spacing “Base” badge on default margin/padding rows. */
  variant?: 'default' | 'primary';
  className?: string;
};

/** Figma Tag default 48:14196 — Tag.Component.default tokens. */
export function Tag({ children, swatchHex, variant = 'default', className }: Props) {
  const classes = [
    'handbook-tag',
    variant === 'primary' ? 'handbook-tag--primary' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {swatchHex ? (
        <span
          className="handbook-tag__swatch"
          style={{ backgroundColor: swatchHex }}
          aria-hidden
        />
      ) : null}
      <span className="handbook-tag__label">{children}</span>
    </span>
  );
}
