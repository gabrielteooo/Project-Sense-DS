import { ButtonTypographySpecTable } from '../blocks/ButtonTypographySpecTable';
import { BUTTON_TYPOGRAPHY_TABLE_ROWS } from './buttonTypographySpec';

/** Typography — label type spec table (Figma 251:10769). */
export function ButtonDesignTypographyDemo() {
  return (
    <div className="design-tab-controlled-example design-tab-controlled-example--typography">
      <ButtonTypographySpecTable rows={BUTTON_TYPOGRAPHY_TABLE_ROWS} />
    </div>
  );
}
