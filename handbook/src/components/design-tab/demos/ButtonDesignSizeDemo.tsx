import { ButtonSizeSpecTable } from '../blocks/ButtonSizeSpecTable';
import { DesignTabFigure } from '../blocks/DesignTabFigure';
import { BUTTON_SIZE_TABLE_ROWS } from './buttonSizeSpec';

const SIZE_FIGURE = {
  src: '/components/button/btn-size.png?v=202610081158',
  alt: 'Button size specification diagram for Base, Small, and X-Small',
};

/** Size — diagram + dimension table (Figma 251:10041). */
export function ButtonDesignSizeDemo() {
  return (
    <div className="design-tab-controlled-example design-tab-controlled-example--size">
      <div className="component-doc-figure-block component-doc-figure-block--structure">
        <DesignTabFigure figure={SIZE_FIGURE} embedded />
      </div>
      <ButtonSizeSpecTable rows={BUTTON_SIZE_TABLE_ROWS} />
    </div>
  );
}
