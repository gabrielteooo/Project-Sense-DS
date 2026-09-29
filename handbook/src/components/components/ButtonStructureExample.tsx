import { FmsDocButton } from './FmsDocButton';

type MeasureProps = {
  label: string;
  className: string;
  width?: number;
  left?: number;
};

/** Figma Measure (e.g. 162:40715 pad, 162:40714 gap) — label, line, space tint. */
function StructurePadMeasure({ label, className, width = 16, left }: MeasureProps) {
  const style =
    left !== undefined
      ? ({ left: `${left}px`, width: `${width}px` } as const)
      : ({ width: `${width}px` } as const);

  return (
    <div className={className} style={style} aria-hidden>
      <span className="button-structure-spec-bubble button-structure-spec-bubble--measure">
        {label}
      </span>
      <div className="button-structure-measure__line">
        <span className="button-structure-measure__line-bar" />
      </div>
      <div className="button-structure-measure__space" />
    </div>
  );
}

type Props = {
  ariaLabel: string;
};

/** Button structure diagram — Figma 161:39626 (Base). */
export function ButtonStructureExample({ ariaLabel }: Props) {
  return (
    <div className="button-structure-scene" role="img" aria-label={ariaLabel}>
      <div className="button-structure-scene__labeled">
        <div className="button-structure-redlines button-structure-redlines--labeled" aria-hidden>
          <div className="button-structure-redlines__icon-key">
            <span className="button-structure-spec-bubble">16px</span>
            <span className="button-structure-spec-icon-box" />
            <span className="button-structure-spec-line button-structure-spec-line--icon-leader" />
          </div>
          <div className="button-structure-redlines__zones">
            <StructurePadMeasure
              className="button-structure-redlines__zones-pad button-structure-redlines__zones-pad--left"
              label="16"
            />
            <StructurePadMeasure
              className="button-structure-redlines__zones-gap"
              label="8"
              width={8}
              left={31}
            />
            <StructurePadMeasure
              className="button-structure-redlines__zones-pad button-structure-redlines__zones-pad--right"
              label="16"
              left={129}
            />
          </div>
        </div>
        <FmsDocButton
          variant="primary"
          size="base"
          label="Button label"
          leadingIconClass="fa-regular fa-plus"
          className="button-structure-scene__btn-labeled fms-doc-btn--anatomy-demo"
        />
        <div className="button-structure-dim-h button-structure-dim-h--wide" aria-hidden>
          <span className="button-structure-dim-h__line" />
          <span className="button-structure-dim-h__label">Width varies</span>
        </div>
      </div>

      <div className="button-structure-scene__ok">
        <FmsDocButton
          variant="primary"
          size="base"
          label="OK"
          className="button-structure-scene__btn-ok fms-doc-btn--anatomy-demo"
        />
        <div className="button-structure-dim-h button-structure-dim-h--ok" aria-hidden>
          <span className="button-structure-dim-h__line" />
          <span className="button-structure-dim-h__label">Min width 55px</span>
        </div>
      </div>

      <div className="button-structure-scene__icon-only">
        <div className="button-structure-redlines button-structure-redlines--icon-only" aria-hidden>
          <span className="button-structure-spec-bubble">16px</span>
          <span className="button-structure-spec-icon-box" />
          <span className="button-structure-spec-line button-structure-spec-line--icon-leader" />
        </div>
        <FmsDocButton
          variant="icon-only"
          size="base"
          label="Search"
          iconClass="fa-regular fa-magnifying-glass"
          className="button-structure-scene__btn-icon fms-doc-btn--anatomy-demo"
        />
        <div className="button-structure-dim-h button-structure-dim-h--icon" aria-hidden>
          <span className="button-structure-dim-h__line" />
          <span className="button-structure-dim-h__label">40px</span>
        </div>
      </div>
    </div>
  );
}
