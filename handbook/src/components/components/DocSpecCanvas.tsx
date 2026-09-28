import type { ReactNode } from 'react';
import type { ComponentCanvasMeasurement } from '../../types/componentDoc';

type Props = {
  children: ReactNode;
  measurements?: ComponentCanvasMeasurement[];
  ariaLabel?: string;
};

/** Neutral canvas for spec measurements and interactive previews. */
export function DocSpecCanvas({ children, measurements = [], ariaLabel }: Props) {
  return (
    <div className="doc-spec-canvas" role="region" aria-label={ariaLabel ?? 'Specification canvas'}>
      <div className="doc-spec-canvas__stage">
        {measurements.map((measurement) => (
          <span
            key={`${measurement.edge}-${measurement.label}`}
            className={`doc-spec-canvas__measure doc-spec-canvas__measure--${measurement.edge}`}
          >
            {measurement.label}
          </span>
        ))}
        <div className="doc-spec-canvas__content">{children}</div>
      </div>
    </div>
  );
}
