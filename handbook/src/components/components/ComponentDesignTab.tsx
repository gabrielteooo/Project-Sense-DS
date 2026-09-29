import { useState } from 'react';
import type { ComponentDocContent } from '../../types/componentDoc';
import { DocSpecCanvas } from './DocSpecCanvas';
import { FmsDocButton, type FmsDocButtonSize } from './FmsDocButton';

const SECTION_GAP = 40;

type Props = {
  doc: ComponentDocContent;
};

export function ComponentDesignTab({ doc }: Props) {
  const { anatomy, specification, types } = doc.design;
  const [size, setSize] = useState<FmsDocButtonSize>('base');
  const isButtonDoc = doc.slug === 'button';

  return (
    <div className="component-doc-tab">
      <section className="component-doc-section">
        <h2 className="colours-overview-section__title">{anatomy.title}</h2>
        {anatomy.description ? (
          <p className="component-doc-section__body">{anatomy.description}</p>
        ) : null}
        {anatomy.imageSrc ? (
          <div className="component-doc-section__figure">
            <img src={anatomy.imageSrc} alt={anatomy.imageAlt ?? ''} />
          </div>
        ) : null}
        {anatomy.parts.length > 0 ? (
          <ol className="component-doc-anatomy__list">
            {anatomy.parts.map((part) => (
              <li key={part.label} className="component-doc-anatomy__item">
                <span className="component-doc-anatomy__term">{part.label}</span>
                <span className="component-doc-anatomy__desc">{part.description}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">{specification.title}</h2>
        {specification.description ? (
          <p className="component-doc-section__body">{specification.description}</p>
        ) : null}
        <DocSpecCanvas measurements={specification.measurements}>
          {isButtonDoc ? (
            <FmsDocButton
              variant={specification.demoVariant}
              size={size}
              label={specification.demoLabel}
            />
          ) : (
            <p className="component-doc-section__placeholder">
              Figma frame preview — link a node to replace this placeholder.
            </p>
          )}
        </DocSpecCanvas>
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <div className="component-doc-types__header">
          <h2 className="colours-overview-section__title">{types.title}</h2>
          {isButtonDoc ? (
            <label className="component-doc-types__size">
              <span className="component-doc-types__size-label">Size</span>
              <select
                className="component-doc-types__size-select"
                value={size}
                onChange={(event) => setSize(event.target.value as FmsDocButtonSize)}
              >
                <option value="xs">X-Small</option>
                <option value="sm">Small</option>
                <option value="base">Base</option>
              </select>
            </label>
          ) : null}
        </div>
        {types.description ? (
          <p className="component-doc-section__body">{types.description}</p>
        ) : null}
        <div className="component-doc-types__grid">
          {types.variants.map((variant, index) => (
            <div key={`${variant.id}-${index}`} className="component-doc-types__cell">
              <p className="component-doc-types__label">{variant.label}</p>
              <DocSpecCanvas ariaLabel={`${variant.label} preview`}>
                {isButtonDoc ? (
                  <FmsDocButton variant={variant.id} size={size} label="Button" />
                ) : (
                  <FmsDocButton variant={variant.id} size="base" label={variant.label} />
                )}
              </DocSpecCanvas>
            </div>
          ))}
          {isButtonDoc ? (
            <div className="component-doc-types__cell">
              <p className="component-doc-types__label">Disabled</p>
              <DocSpecCanvas ariaLabel="Disabled button preview">
                <FmsDocButton variant="primary" size={size} disabled label="Button" />
              </DocSpecCanvas>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
