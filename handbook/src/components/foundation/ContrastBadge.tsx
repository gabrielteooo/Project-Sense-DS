import { relativeLuminance } from '../../utils/contrast';

type Props = {
  hex: string;
};

/** Figma Contrast 1:10808 — “A” badge in table */
export function ContrastBadge({ hex }: Props) {
  const lightBg = relativeLuminance(hex) > 0.55;

  return (
    <span
      className={
        lightBg
          ? 'contrast-badge contrast-badge--on-light'
          : 'contrast-badge contrast-badge--on-dark'
      }
      style={{ color: hex }}
      aria-hidden
    >
      A
    </span>
  );
}
