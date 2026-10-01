import type { ComponentPageImage } from '../../types/componentPageTemplate';

type Props = {
  image: ComponentPageImage;
  className?: string;
};

export function ComponentPageImageView({ image, className }: Props) {
  const hasSrc = Boolean(image.src?.trim());

  return (
    <figure className={['doc-block doc-block--image', className].filter(Boolean).join(' ')}>
      <div className="doc-block-image__frame">
        {hasSrc ? (
          <img
            src={image.src}
            alt={image.alt}
            className="doc-block-image__img"
            loading="lazy"
          />
        ) : (
          <p className="component-doc-section__placeholder">
            Upload a diagram in Pages CMS (Documentation images).
          </p>
        )}
      </div>
      {image.caption?.trim() ? (
        <figcaption className="doc-block-image__caption">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}
