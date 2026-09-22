import { Link } from 'react-router-dom';

type LabeledBullet = { label: string; text: string };

type BulletItem =
  | string
  | {
      text: string;
      link?: { label: string; href: string };
      textAfter?: string;
    };

type Block =
  | { type: 'labeledBullets'; items: LabeledBullet[] }
  | { type: 'subheadingBullets'; label: string; items: string[] }
  | { type: 'labeledParagraph'; label: string; text: string }
  | {
      type: 'labeledParagraphWithBullets';
      label: string;
      intro: string;
      items: BulletItem[];
    };

export type WritingGuidelinesSection = {
  number: number;
  title: string;
  blocks: Block[];
};

function renderBulletItem(item: BulletItem, key: number) {
  if (typeof item === 'string') {
    return <li key={key}>{item}</li>;
  }
  return (
    <li key={key}>
      {item.text}
      {item.link ? (
        <Link to={item.link.href} className="writing-guidelines__link">
          {item.link.label}
        </Link>
      ) : null}
      {item.textAfter ?? null}
    </li>
  );
}

function WritingGuidelinesBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'labeledBullets':
      return (
        <ul className="writing-guidelines__list writing-guidelines__list--top">
          {block.items.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong> {item.text}
            </li>
          ))}
        </ul>
      );
    case 'subheadingBullets':
      return (
        <div className="writing-guidelines__block">
          <p className="writing-guidelines__subheading">{block.label}</p>
          <ul className="writing-guidelines__list writing-guidelines__list--nested">
            {block.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case 'labeledParagraph':
      return (
        <p className="writing-guidelines__paragraph">
          <strong>{block.label}</strong> {block.text}
        </p>
      );
    case 'labeledParagraphWithBullets':
      return (
        <div className="writing-guidelines__block">
          <p className="writing-guidelines__paragraph">
            <strong>{block.label}</strong> {block.intro}
          </p>
          <ul className="writing-guidelines__list writing-guidelines__list--nested">
            {block.items.map((item, index) => renderBulletItem(item, index))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

type Props = {
  sections: WritingGuidelinesSection[];
};

export function WritingGuidelinesContent({ sections }: Props) {
  return (
    <div className="writing-guidelines__sections">
      {sections.map((section) => (
        <section key={section.number} className="writing-guidelines__section">
          <h2 className="writing-guidelines__section-title">
            {section.number}. {section.title}
          </h2>
          <div className="writing-guidelines__section-body">
            {section.blocks.map((block, index) => (
              <WritingGuidelinesBlock key={index} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
