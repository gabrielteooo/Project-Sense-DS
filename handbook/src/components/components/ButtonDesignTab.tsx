import { useState } from 'react';
import buttonDoc from '../../../content/components/button.json';
import { HandbookDocTable } from '../foundation/HandbookDocTable';
import { ButtonAnatomyExample } from './ButtonAnatomyExample';
import { ButtonStructureExample } from './ButtonStructureExample';
import { DocSegmentedControl } from './DocSegmentedControl';
import { FmsDocButton, type FmsDocButtonState } from './FmsDocButton';

const SECTION_GAP = 40;

type SpecSize = 'base' | 'small' | 'x-small';

/** Button — Design tab (Figma 115:606) */
export function ButtonDesignTab() {
  const { anatomy, specificationGuidelines, structure, spacingsBetweenButtons, buttonTypes } =
    buttonDoc.design;

  const [specSize, setSpecSize] = useState<SpecSize>('base');
  const [structureSize, setStructureSize] = useState<SpecSize>('base');
  const [previewState, setPreviewState] = useState<FmsDocButtonState>('default');

  const specTable = specificationGuidelines.tables[specSize];

  return (
    <div className="component-doc-tab component-doc-tab--button-design">
      <section className="component-doc-section">
        <h2 className="component-doc-h2">{anatomy.title}</h2>
        <div className="component-doc-figure-block component-doc-figure-block--anatomy">
          <ButtonAnatomyExample ariaLabel={anatomy.imageAlt} />
        </div>
        <ul className="component-doc-anatomy-legend">
          {anatomy.parts.map((part, index) => (
            <li key={part.label} className="component-doc-anatomy-legend__item">
              <span className="component-doc-anatomy-legend__badge">{index + 1}</span>
              <p className="component-doc-anatomy-legend__text">
                <strong>{part.label}</strong>
                {' — '}
                {part.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="component-doc-h2">{specificationGuidelines.title}</h2>
        <DocSegmentedControl
          ariaLabel="Button specification size"
          options={specificationGuidelines.sizeOptions.map((option) => ({
            value: option.id as SpecSize,
            label: option.label,
          }))}
          value={specSize}
          onChange={setSpecSize}
        />
        <HandbookDocTable columns={specTable.columns} rows={specTable.rows} />
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h3 className="component-doc-h3">{structure.title}</h3>
        <DocSegmentedControl
          ariaLabel="Button structure size"
          options={specificationGuidelines.sizeOptions.map((option) => ({
            value: option.id as SpecSize,
            label: option.label,
          }))}
          value={structureSize}
          onChange={setStructureSize}
        />
        <div className="component-doc-figure-block component-doc-figure-block--structure">
          {structureSize === 'base' ? (
            <ButtonStructureExample ariaLabel={structure.imageAlt} />
          ) : null}
        </div>
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h3 className="component-doc-h3">{spacingsBetweenButtons.title}</h3>
        <div
          className="component-doc-figure-block component-doc-figure-block--empty"
          aria-hidden
        />
      </section>

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="component-doc-h2">{buttonTypes.title}</h2>

        <div className="component-doc-subsection">
          <h3 className="component-doc-h3">{buttonTypes.variants.title}</h3>
          <p className="component-doc-section__body">{buttonTypes.variants.description}</p>
          <div className="component-doc-figure-block component-doc-figure-block--variants">
            <div className="component-doc-variant-row">
              {buttonTypes.variants.items.map((item) => (
                <FmsDocButton
                  key={item.variant}
                  variant={item.variant}
                  size="base"
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="component-doc-subsection component-doc-subsection--states" style={{ marginTop: 32 }}>
          <h3 className="component-doc-h3">{buttonTypes.states.title}</h3>
          <div className="component-doc-states-panel">
            <DocSegmentedControl
              ariaLabel="Button preview state"
              options={buttonTypes.states.options.map((option) => ({
                value: option.id as FmsDocButtonState,
                label: option.label,
              }))}
              value={previewState}
              onChange={setPreviewState}
            />
            <div className="component-doc-figure-block component-doc-figure-block--states">
              <div className="component-doc-variant-row">
                {buttonTypes.variants.items.map((item) => (
                  <FmsDocButton
                    key={`${item.variant}-${previewState}`}
                    variant={item.variant}
                    size="base"
                    label={item.label}
                    state={previewState}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
