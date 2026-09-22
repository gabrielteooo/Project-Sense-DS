import { Navigate, useParams } from 'react-router-dom';
import { GET_STARTED_DOCS } from '../content/getStartedDocs';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

/** Get started — single-level guideline pages (content from JSON) */
export function GetStartedDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? GET_STARTED_DOCS[slug] : undefined;

  if (!doc) {
    return <Navigate to="/get-started" replace />;
  }

  return (
    <article className="get-started-page">
      <HandbookPageHeader
        title={doc.pageTitle}
        description={[doc.pageDescription, ...doc.introParagraphs]}
      />
    </article>
  );
}
