import type { DesignTabFigure as DesignTabFigureModel } from '../../../types/designTab';

type Props = {
  figure: DesignTabFigureModel;
  className?: string;
  /** Inside anatomy canvas — no nested figure-block chrome */
  embedded?: boolean;
};

export function DesignTabFigure({ figure, className, embedded }: Props) {
  const img = (
    <img
      src={figure.src}
      alt={figure.alt}
      className="design-tab-figure__img component-doc-structure-image"
      loading="lazy"
    />
  );

  if (embedded) {
    return (
      <figure className={['design-tab-figure', 'design-tab-figure--embedded', className].filter(Boolean).join(' ')}>
        {img}
        {figure.caption ? (
          <figcaption className="doc-block-image__caption">{figure.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure
      className={['design-tab-figure', 'component-doc-figure-block', 'doc-block', 'doc-block--image', className]
        .filter(Boolean)
        .join(' ')}
    >
      {img}
      {figure.caption ? (
        <figcaption className="doc-block-image__caption">{figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}
