import layoutResponsiveGrid from '../../content/foundation/layout-responsive-grid.json';
import desktopDiagramImg from '../../public/foundation/layout/responsive-grid-desktop.png';
import { HandbookDocTable } from '../components/foundation/HandbookDocTable';
import { HandbookPageHeader } from '../components/shell/HandbookPageHeader';

const SECTION_GAP_PX = 40;

const DIAGRAM_IMAGES = {
  desktop: desktopDiagramImg,
} as const;

/** Layout — Responsive grid (Figma 117:655) */
export function LayoutResponsiveGridPage() {
  return (
    <article className="foundation-layout-page">
      <HandbookPageHeader
        title="Responsive grid"
        description={layoutResponsiveGrid.pageDescription}
      />

      {layoutResponsiveGrid.breakpoints.map((breakpoint, index) => (
        <section
          key={breakpoint.id}
          className="layout-grid-breakpoint"
          style={index > 0 ? { marginTop: SECTION_GAP_PX } : undefined}
        >
          <div className="layout-grid-breakpoint__intro">
            <h2 className="colours-overview-section__title">{breakpoint.title}</h2>
            <p className="layout-grid-breakpoint__description">{breakpoint.description}</p>
          </div>

          <HandbookDocTable
            className="layout-grid-table-wrap"
            columns={breakpoint.table.columns}
            rows={breakpoint.table.rows}
          />

          <div className="layout-grid-diagram">
            <img
              className="layout-grid-diagram__image"
              src={DIAGRAM_IMAGES[breakpoint.id as keyof typeof DIAGRAM_IMAGES]}
              alt={breakpoint.diagramAlt}
            />
          </div>
        </section>
      ))}
    </article>
  );
}
