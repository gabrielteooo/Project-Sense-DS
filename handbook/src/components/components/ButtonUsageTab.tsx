import { useState } from 'react';
import buttonDoc from '../../../content/components/button.json';
import { DocSegmentedControl } from './DocSegmentedControl';
import { FmsDocButton, type FmsDocButtonSize } from './FmsDocButton';

const SECTION_GAP = 32;

type UsageSize = 'base' | 'small' | 'x-small';

const SIZE_TO_BTN: Record<UsageSize, FmsDocButtonSize> = {
  base: 'base',
  small: 'sm',
  'x-small': 'xs',
};

type UsageButton = {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon-only';
  danger?: boolean;
  leadingIconClass?: string;
};

type Showcase = {
  id: string;
  title: string;
  description: string;
  sizeOptions: { id: UsageSize; label: string }[];
  contextBySize: Partial<Record<UsageSize, string>>;
  rows?: UsageButton[][];
  buttons?: UsageButton[];
  wrap?: boolean;
};

/** Button — Usage tab (Figma 154:38298). */
export function ButtonUsageTab() {
  const usage = buttonDoc.usage as typeof buttonDoc.usage & {
    figmaNodeId?: string;
    guidelines: { title: string; bullets: string[] };
    buttonUsage: { title: string; items: { term: string; body: string }[] };
    variantShowcases: Showcase[];
    examples: { title: string };
  };

  const [showcaseSizes, setShowcaseSizes] = useState<Record<string, UsageSize>>(() =>
    Object.fromEntries(usage.variantShowcases.map((s) => [s.id, s.sizeOptions[0]?.id ?? 'base'])),
  );

  return (
    <div className="component-doc-tab component-doc-usage-tab component-doc-usage-tab--button">
      <section className="component-doc-section component-doc-usage-section">
        <h2 className="colours-overview-section__title">{usage.guidelines.title}</h2>
        <ul className="component-doc-usage-bullets">
          {usage.guidelines.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section className="component-doc-section component-doc-usage-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">{usage.buttonUsage.title}</h2>
        <ul className="component-doc-usage-types-list">
          {usage.buttonUsage.items.map((item) => (
            <li key={item.term}>
              <strong>{item.term}:</strong> {item.body}
            </li>
          ))}
        </ul>
      </section>

      <hr className="component-doc-usage-divider" />

      {usage.variantShowcases.map((showcase) => {
        const size = showcaseSizes[showcase.id] ?? 'base';
        const contextNote =
          showcase.contextBySize[size] ??
          showcase.contextBySize.base ??
          '';

        return (
          <section
            key={showcase.id}
            className="component-doc-usage-showcase-section"
            style={{ marginTop: SECTION_GAP }}
          >
            <div className="component-doc-usage-showcase-section__intro">
              <h3 className="component-doc-h3">{showcase.title}</h3>
              <p className="component-doc-section__body">{showcase.description}</p>
            </div>
            <DocSegmentedControl
              ariaLabel={`${showcase.title} size`}
              options={showcase.sizeOptions.map((option) => ({
                value: option.id,
                label: option.label,
              }))}
              value={size}
              onChange={(value) =>
                setShowcaseSizes((prev) => ({ ...prev, [showcase.id]: value as UsageSize }))
              }
            />
            <div className="component-doc-figure-block component-doc-usage-showcase">
              <div className="component-doc-usage-showcase__header">
                <p className="component-doc-usage-showcase__note">{contextNote}</p>
                <hr className="component-doc-usage-showcase__rule" />
              </div>
              <div
                className={[
                  'component-doc-usage-showcase__buttons',
                  showcase.wrap ? 'component-doc-usage-showcase__buttons--wrap' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {showcase.rows
                  ? showcase.rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="component-doc-usage-showcase__row">
                        {row.map((btn) => (
                          <UsageExampleButton key={btn.label} button={btn} size={size} />
                        ))}
                      </div>
                    ))
                  : showcase.wrap
                    ? (showcase.buttons ?? []).map((btn) => (
                        <UsageExampleButton key={btn.label} button={btn} size={size} />
                      ))
                    : (
                        <div className="component-doc-usage-showcase__row">
                          {(showcase.buttons ?? []).map((btn) => (
                            <UsageExampleButton key={btn.label} button={btn} size={size} />
                          ))}
                        </div>
                      )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">{usage.examples.title}</h2>
      </section>
    </div>
  );
}

function UsageExampleButton({ button, size }: { button: UsageButton; size: UsageSize }) {
  return (
    <FmsDocButton
      variant={button.variant}
      size={SIZE_TO_BTN[size]}
      label={button.label}
      leadingIconClass={button.leadingIconClass}
      danger={button.danger}
      className="fms-doc-btn--usage-demo"
    />
  );
}
