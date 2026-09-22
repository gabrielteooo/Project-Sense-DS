import contentFormatting from '../../content/get-started/content-formatting.json';
import { ContentFormattingContent } from '../components/get-started/ContentFormattingContent';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — Content formatting (Figma 100:5465) */
export function ContentFormattingPage() {
  return (
    <article className="get-started-page writing-guidelines-page content-formatting-page">
      <HandbookPageHeader
        title={contentFormatting.pageTitle}
        description={contentFormatting.pageDescription}
      />
      <ContentFormattingContent sections={contentFormatting.sections} />
    </article>
  );
}
