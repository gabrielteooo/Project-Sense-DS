import { ButtonStructureSpecTable } from '../blocks/ButtonStructureSpecTable';
import { DesignTabFigure } from '../blocks/DesignTabFigure';
import { BUTTON_STRUCTURE_TABLE_ROWS } from './buttonStructureSpec';

const STRUCTURE_FIGURE = {
  src: '/components/button/btn-structure.png',
  alt: 'Button structure diagram with padding, gap, and width annotations for Base size',
};

/** Structure — diagram + padding table (Figma 246:8057). */
export function ButtonDesignStructureDemo() {
  return (
    <div className="design-tab-controlled-example design-tab-controlled-example--structure">
      <div className="component-doc-figure-block component-doc-figure-block--structure">
        <DesignTabFigure figure={STRUCTURE_FIGURE} embedded />
      </div>
      <ButtonStructureSpecTable rows={BUTTON_STRUCTURE_TABLE_ROWS} />
    </div>
  );
}
