import { useState } from 'react';
import { DocSegmentedControl } from './DocSegmentedControl';
import { FmsDocButton, type FmsDocButtonSize } from './FmsDocButton';

const SECTION_GAP = 32;

export type UsageSize = 'base' | 'small' | 'x-small';

const SIZE_TO_BTN: Record<UsageSize, FmsDocButtonSize> = {
  base: 'base',
  small: 'sm',
  'x-small': 'xs',
};

export type UsageButton = {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon-only';
  danger?: boolean;
  leadingIconClass?: string;
};

export type ButtonUsageShowcaseData = {
  id: string;
  title: string;
  description: string;
  sizeOptions: { id: UsageSize; label: string }[];
  contextBySize: Partial<Record<UsageSize, string>>;
  rows?: UsageButton[][];
  buttons?: UsageButton[];
  wrap?: boolean;
};

type Props = {
  showcase: ButtonUsageShowcaseData;
  size?: UsageSize;
  onSizeChange?: (size: UsageSize) => void;
  marginTop?: number;
};

export function ButtonUsageShowcase({
  showcase,
  size: controlledSize,
  onSizeChange,
  marginTop = SECTION_GAP,
}: Props) {
  const [internalSize, setInternalSize] = useState<UsageSize>(
    showcase.sizeOptions[0]?.id ?? 'base',
  );
  const size = controlledSize ?? internalSize;
  const setSize = onSizeChange ?? setInternalSize;

  const contextNote =
    showcase.contextBySize[size] ?? showcase.contextBySize.base ?? '';

  return (
    <section
      className="component-doc-usage-showcase-section"
      style={{ marginTop }}
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
        onChange={(value) => setSize(value as UsageSize)}
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
