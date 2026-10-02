import type { DesignTabDocument } from '../../types/designTab';
import buttonDoc from '../../../content/components/button.json';

type ButtonJson = typeof buttonDoc & {
  designTab?: DesignTabDocument;
  design: typeof buttonDoc.design & {
    specificationGuidelines: {
      sizeOptions: { id: string; label: string }[];
      tables: Record<string, { columns: string[]; rows: string[][] }>;
    };
    structure: {
      title: string;
      imageAlt: string;
      images?: Record<string, string>;
    };
  };
};

/** Build Design tab document from `designTab` or legacy `design` keys. */
export function loadButtonDesignTabDocument(): DesignTabDocument {
  const doc = buttonDoc as ButtonJson;
  if (doc.designTab?.sections?.length) {
    return doc.designTab;
  }

  const { anatomy, specificationGuidelines, structure } = doc.design;
  const sizeOptions = specificationGuidelines.sizeOptions;

  return {
    figmaNodeId: doc.figmaNodeId,
    sections: [
      {
        id: 'anatomy',
        kind: 'anatomy',
        title: anatomy.title,
        headingLevel: 2,
        figure: {
          src: '/images/docs/btn-anatomy-3.png',
          alt: anatomy.imageAlt ?? 'Button anatomy',
        },
        legend: anatomy.parts.map((p) => ({ label: p.label, description: p.description })),
      },
      {
        id: 'configuration',
        kind: 'controlledExample',
        title: 'Configuration',
        headingLevel: 2,
        demoId: 'button-design-configuration',
      },
      {
        id: 'specification',
        kind: 'sectionGroup',
        title: 'Specification',
        headingLevel: 2,
        children: [
          {
            id: 'colour',
            kind: 'controlledExample',
            title: 'Colour',
            headingLevel: 3,
            demoId: 'button-design-colour',
          },
          {
            id: 'structure',
            kind: 'figureTable',
            title: structure.title,
            headingLevel: 3,
            sizeOptions,
            defaultSize: 'base',
            figuresBySize: structure.images
              ? Object.fromEntries(
                  Object.entries(structure.images).map(([size, src]) => [
                    size,
                    { src, alt: structure.imageAlt },
                  ]),
                )
              : undefined,
            structureDemoId: 'button-design-structure-canvas',
          },
          {
            id: 'size',
            kind: 'figureTable',
            title: 'Size',
            headingLevel: 3,
            sizeOptions,
            defaultSize: specificationGuidelines.defaultSize ?? 'base',
            figure: {
              src: '/images/docs/btn-specs-1.png',
              alt: 'Button size specification diagram',
            },
            tablesBySize: specificationGuidelines.tables,
          },
        ],
      },
    ],
  };
}
