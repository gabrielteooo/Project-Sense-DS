import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** When set, shows a colour swatch before the label (Figma 58:15689). */
  swatchHex?: string;
  className?: string;
};

/** Figma Tag default 48:14196 — Tag.Component.default tokens. */
export function Tag({ children, swatchHex, className }: Props) {
  const classes = ['handbook-tag', className].filter(Boolean).join(' ');

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
