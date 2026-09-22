type TextPart = { text: string; italic?: boolean };

type ListChild = string | { parts: TextPart[] };

type ListItem = {
  text: string;
  letteredItems?: string[];
  children?: ListChild[];
};

export type ContentFormattingSection = {
  title: string;
  list: ListItem[];
};

function renderChild(child: ListChild, key: number) {
  if (typeof child === 'string') {
    return <li key={key}>{child}</li>;
  }
  return (
    <li key={key}>
      {child.parts.map((part, index) =>
        part.italic ? (
          <em key={index} className="content-formatting__em">
            {part.text}
          </em>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </li>
  );
}

function ContentFormattingListItem({ item }: { item: ListItem }) {
  return (
    <li>
      <span>{item.text}</span>
      {item.letteredItems?.length ? (
        <ol className="content-formatting__letter-list" type="a">
          {item.letteredItems.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ol>
      ) : null}
      {item.children?.length ? (
        <ul className="writing-guidelines__list writing-guidelines__list--nested">
          {item.children.map((child, index) => renderChild(child, index))}
        </ul>
      ) : null}
    </li>
  );
}

type Props = {
  sections: ContentFormattingSection[];
};

export function ContentFormattingContent({ sections }: Props) {
  return (
    <div className="writing-guidelines__sections content-formatting__sections">
      {sections.map((section, index) => (
        <section key={section.title} className="writing-guidelines__section">
          <h2 className="writing-guidelines__section-title">
            {index + 1}. {section.title}
          </h2>
          <ul className="writing-guidelines__list writing-guidelines__list--content-formatting">
            {section.list.map((item) => (
              <ContentFormattingListItem key={item.text} item={item} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
