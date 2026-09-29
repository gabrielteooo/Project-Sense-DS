import { FmsDocButton } from './FmsDocButton';

type Props = {
  /** Describes the diagram for assistive tech (matches former image alt). */
  ariaLabel: string;
};

/**
 * Button anatomy canvas — Figma 153:7515 (inner group 161:40665).
 * Layout metrics from Dev Mode / get_metadata.
 */
export function ButtonAnatomyExample({ ariaLabel }: Props) {
  return (
    <div className="button-anatomy-scene" role="img" aria-label={ariaLabel}>
      <div className="button-anatomy-scene__composition">
        <div className="button-anatomy-callout button-anatomy-callout--container" aria-hidden>
          <span className="button-anatomy-callout__badge">1</span>
          <span className="button-anatomy-callout__line button-anatomy-callout__line--horizontal" />
        </div>

        <div className="button-anatomy-callout button-anatomy-callout--icon" aria-hidden>
          <span className="button-anatomy-callout__badge">3</span>
          <span className="button-anatomy-callout__line button-anatomy-callout__line--vertical-down" />
        </div>

        <FmsDocButton
          variant="primary"
          size="base"
          label="Button"
          leadingIconClass="fa-regular fa-magnifying-glass"
          className="button-anatomy-scene__button fms-doc-btn--anatomy-demo"
        />

        <div className="button-anatomy-callout button-anatomy-callout--label" aria-hidden>
          <span className="button-anatomy-callout__line button-anatomy-callout__line--vertical-up" />
          <span className="button-anatomy-callout__badge">2</span>
        </div>
      </div>
    </div>
  );
}
