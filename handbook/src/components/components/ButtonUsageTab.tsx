import { useState } from 'react';
import buttonDoc from '../../../content/components/button.json';
import { DocBlockList } from '../../doc-blocks/DocBlockRenderer';
import {
  ButtonUsageShowcase,
  type ButtonUsageShowcaseData,
  type UsageSize,
} from './ButtonUsageShowcase';
import type { DocBlockList as DocBlockListType } from '../../types/docBlocks';

const SECTION_GAP = 32;

/** Button — Usage tab (Figma 154:38298). Content from JSON; interactive showcases in React. */
export function ButtonUsageTab() {
  const usage = buttonDoc.usage as typeof buttonDoc.usage & {
    figmaNodeId?: string;
    guidelines: { title: string; bullets: string[] };
    buttonUsage: { title: string; items: { term: string; body: string }[] };
    variantShowcases: ButtonUsageShowcaseData[];
    examples: { title: string };
    contentBlocks?: DocBlockListType;
  };

  const [showcaseSizes, setShowcaseSizes] = useState<Record<string, UsageSize>>(() =>
    Object.fromEntries(usage.variantShowcases.map((s) => [s.id, s.sizeOptions[0]?.id ?? 'base'])),
  );

  const contentBlocks = usage.contentBlocks?.length ? usage.contentBlocks : null;

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

      {contentBlocks ? (
        <section
          className="component-doc-section component-doc-usage-section"
          style={{ marginTop: SECTION_GAP }}
        >
          <DocBlockList
            blocks={contentBlocks}
            interactive={{ buttonShowcases: usage.variantShowcases }}
          />
        </section>
      ) : null}

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

      {usage.variantShowcases.map((showcase) => (
        <ButtonUsageShowcase
          key={showcase.id}
          showcase={showcase}
          size={showcaseSizes[showcase.id] ?? showcase.sizeOptions[0]?.id ?? 'base'}
          onSizeChange={(value) =>
            setShowcaseSizes((prev) => ({ ...prev, [showcase.id]: value }))
          }
        />
      ))}

      <section className="component-doc-section" style={{ marginTop: SECTION_GAP }}>
        <h2 className="colours-overview-section__title">{usage.examples.title}</h2>
      </section>
    </div>
  );
}
