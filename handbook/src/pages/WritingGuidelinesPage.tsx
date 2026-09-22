import writingGuidelines from '../../content/get-started/writing-guidelines.json';
import { WritingGuidelinesContent } from '../components/get-started/WritingGuidelinesContent';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — Content Writing Guidelines (Figma 100:2180) */
export function WritingGuidelinesPage() {
  return (
    <article className="get-started-page writing-guidelines-page">
      <HandbookPageHeader
        title={writingGuidelines.pageTitle}
        description={writingGuidelines.pageDescription}
      />
      <WritingGuidelinesContent sections={writingGuidelines.sections} />
    </article>
  );
}
