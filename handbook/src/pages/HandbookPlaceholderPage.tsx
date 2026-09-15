import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

type Props = {
  title: string;
};

export function HandbookPlaceholderPage({ title }: Props) {
  return (
    <article>
      <HandbookPageHeader
        title={title}
        description="This section is not available in the handbook yet."
      />
    </article>
  );
}
