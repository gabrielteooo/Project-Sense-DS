import { HANDBOOK_SHELL } from '../../figma/metrics';

type Props = {
  title: string;
  description: string | string[];
  /** Landing pages — no divider; tighter spacing before full-bleed content band */
  variant?: 'default' | 'landing';
};

/** Figma Page header 1:10480 */
export function HandbookPageHeader({ title, description, variant = 'default' }: Props) {
  const isLanding = variant === 'landing';
  const paragraphs = (Array.isArray(description) ? description : [description]).filter(
    (paragraph) => paragraph.trim().length > 0,
  );

  return (
    <header
      className={[
        'handbook-page-header',
        isLanding ? 'handbook-page-header--landing' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        gap: HANDBOOK_SHELL.pageHeaderGapPx,
        paddingBottom: HANDBOOK_SHELL.pageHeaderPaddingBottomPx,
        marginBottom: isLanding ? 0 : HANDBOOK_SHELL.pageHeaderMarginBottomPx,
      }}
    >
      <h1 className="handbook-page-header__title">{title}</h1>
      {paragraphs.length > 0 ? (
        <div className="handbook-page-header__description">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="handbook-page-header__description-p">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </header>
  );
}
