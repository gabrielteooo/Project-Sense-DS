import { HandbookDocTable } from '../components/foundation/HandbookDocTable';
import {
  ButtonUsageShowcase,
  type ButtonUsageShowcaseData,
} from '../components/components/ButtonUsageShowcase';
import type { DocBlock } from '../types/docBlocks';
import { getInteractiveDemo } from './interactiveDemoRegistry';
import { SafeRichText } from './safeRichText';

type InteractiveContext = {
  buttonShowcases?: ButtonUsageShowcaseData[];
};

type Props = {
  block: DocBlock;
  interactive?: InteractiveContext;
};

export function DocBlockRenderer({ block, interactive }: Props) {
  switch (block.type) {
    case 'richText':
      return (
        <section className="doc-block doc-block--rich-text" data-doc-block-id={block.id}>
          {block.title ? (
            <h3 className="colours-overview-section__title doc-block__title">{block.title}</h3>
          ) : null}
          <SafeRichText body={block.body} format={block.format} />
        </section>
      );

    case 'image':
      return (
        <figure className="doc-block doc-block--image" data-doc-block-id={block.id}>
          {block.title ? (
            <figcaption className="doc-block__title doc-block__title--figure">
              {block.title}
            </figcaption>
          ) : null}
          <div className="doc-block-image__frame">
            <img src={block.src} alt={block.alt} className="doc-block-image__img" loading="lazy" />
          </div>
          {block.caption ? (
            <figcaption className="doc-block-image__caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      );

    case 'table':
      return (
        <section className="doc-block doc-block--table" data-doc-block-id={block.id}>
          {block.title ? (
            <h3 className="colours-overview-section__title doc-block__title">{block.title}</h3>
          ) : null}
          <HandbookDocTable columns={block.columns} rows={block.rows} />
        </section>
      );

    case 'doDont':
      return (
        <section className="doc-block doc-block--do-dont" data-doc-block-id={block.id}>
          {block.title ? (
            <h3 className="colours-overview-section__title doc-block__title">{block.title}</h3>
          ) : null}
          <HandbookDocTable
            columns={['Do', "Don't"]}
            rows={block.pairs.map((pair) => [pair.do, pair.dont])}
            className="doc-block-do-dont__table"
          />
        </section>
      );

    case 'callout':
      return (
        <aside
          className={[
            'doc-block',
            'doc-block--callout',
            block.variant === 'warning'
              ? 'doc-block-callout--warning'
              : 'doc-block-callout--information',
          ].join(' ')}
          data-doc-block-id={block.id}
          role="note"
        >
          {block.title ? <p className="doc-block-callout__title">{block.title}</p> : null}
          <SafeRichText body={block.body} format={block.format} className="doc-block-callout__body" />
        </aside>
      );

    case 'interactiveExample': {
      const demo = getInteractiveDemo(block.demoId);
      if (!demo || demo.componentSlug !== 'button') {
        return (
          <p className="doc-block doc-block--error" data-doc-block-id={block.id}>
            Unknown interactive demo: {block.demoId}
          </p>
        );
      }
      const showcase = interactive?.buttonShowcases?.find((s) => s.id === demo.showcaseId);
      if (!showcase) {
        return (
          <p className="doc-block doc-block--error" data-doc-block-id={block.id}>
            Demo configuration missing for {block.demoId}.
          </p>
        );
      }
      return (
        <div className="doc-block doc-block--interactive" data-doc-block-id={block.id}>
          {block.title ? (
            <h3 className="colours-overview-section__title doc-block__title">{block.title}</h3>
          ) : null}
          <ButtonUsageShowcase showcase={showcase} marginTop={0} />
        </div>
      );
    }

    default:
      return null;
  }
}

type ListProps = {
  blocks: DocBlock[];
  interactive?: InteractiveContext;
  className?: string;
};

export function DocBlockList({ blocks, interactive, className }: ListProps) {
  return (
    <div className={['doc-block-list', className].filter(Boolean).join(' ')}>
      {blocks.map((block) => (
        <DocBlockRenderer key={block.id} block={block} interactive={interactive} />
      ))}
    </div>
  );
}
