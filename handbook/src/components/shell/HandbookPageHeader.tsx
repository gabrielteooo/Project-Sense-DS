import { HANDBOOK_SHELL } from '../../figma/metrics';

type Props = {
  title: string;
  description: string | string[];
};

/** Figma Page header 1:10480 */
export function HandbookPageHeader({ title, description }: Props) {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <header
      className="handbook-page-header"
      style={{
        gap: HANDBOOK_SHELL.pageHeaderGapPx,
        paddingBottom: HANDBOOK_SHELL.pageHeaderPaddingBottomPx,
        marginBottom: HANDBOOK_SHELL.pageHeaderMarginBottomPx,
      }}
    >
      <h1 className="handbook-page-header__title">{title}</h1>
      <div className="handbook-page-header__description">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="handbook-page-header__description-p">
            {paragraph}
          </p>
        ))}
      </div>
    </header>
  );
}
