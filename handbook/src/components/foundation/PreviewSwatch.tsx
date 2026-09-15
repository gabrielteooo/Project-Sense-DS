import { relativeLuminance } from '../../utils/contrast';

type Props = {
  hex: string;
  step: number;
};

/** Figma Preview 1:10805 — swatch with “Aa” */
export function PreviewSwatch({ hex, step }: Props) {
  const lightBg = relativeLuminance(hex) > 0.55;
  return (
    <span
      className="preview-swatch"
      style={{ backgroundColor: hex }}
      title={`Step ${step}`}
    >
      <span
        className={
          lightBg ? 'preview-swatch__aa preview-swatch__aa--dark' : 'preview-swatch__aa'
        }
      >
        Aa
      </span>
    </span>
  );
}
