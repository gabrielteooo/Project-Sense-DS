import { FmsDocButton } from './FmsDocButton';
import { Tag } from '../ui/Tag';

type Props = {
  slug: string;
};

/** Card body preview — Figma *Card* / Basic 152:6989 */
export function ComponentOverviewPreview({ slug }: Props) {
  switch (slug) {
    case 'button':
      return (
        <div className="component-overview-preview component-overview-preview--button">
          <FmsDocButton variant="primary" size="base" label="Button" />
          <FmsDocButton variant="secondary" size="base" label="Button" />
        </div>
      );
    case 'dropdown':
      return (
        <div className="component-overview-preview component-overview-preview--dropdown">
          <FmsDocButton variant="secondary" size="base" label="Actions" />
        </div>
      );
    case 'radio':
      return (
        <div className="component-overview-preview component-overview-preview--radio">
          <span className="component-overview-preview__radio" aria-hidden />
          <span className="component-overview-preview__radio component-overview-preview__radio--selected" aria-hidden />
          <span className="component-overview-preview__radio" aria-hidden />
        </div>
      );
    case 'tag':
      return (
        <div className="component-overview-preview component-overview-preview--tag">
          <Tag>Tag</Tag>
        </div>
      );
    default:
      return (
        <div className="component-overview-preview component-overview-preview--placeholder" aria-hidden />
      );
  }
}
