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

  const { anatomy, structure } = doc.design;

  return {
    figmaNodeId: doc.figmaNodeId,
    sections: [
      {
        id: 'anatomy',
        kind: 'anatomy',
        title: anatomy.title,
        headingLevel: 2,
        figure: {
          src: '/components/button/btn-anatomy-2.png',
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
            kind: 'controlledExample',
            title: structure.title,
            headingLevel: 3,
            description:
              'The button system uses a unified padding structure across all standard button variants (Primary, Secondary, and Tertiary). Layout spacing strictly varies by button size, ensuring visual harmony regardless of visual priority.',
            demoId: 'button-design-structure',
          },
          {
            id: 'button-group',
            kind: 'figureTable',
            title: 'Button Group',
            headingLevel: 3,
            description:
              'In button groups, the external spacing between adjacent buttons (inter-button gap) scales proportionally with the button size to maintain visual balance and clear touch-target separation.',
            figure: {
              src: '/components/button/btn-button-group.png?v=202610081152',
              alt: 'Button group diagram showing inter-button gap scaling by button size',
            },
          },
          {
            id: 'size',
            kind: 'controlledExample',
            title: 'Size',
            headingLevel: 3,
            description:
              'Buttons dynamically expand to hug their text content horizontally, while standalone icon buttons scale uniformly into fixed square targets. Each size applies consistent height and proportional corner radiuses to ensure visual balance throughout the interface.',
            demoId: 'button-design-size',
          },
          {
            id: 'typography',
            kind: 'controlledExample',
            title: 'Typography',
            headingLevel: 3,
            description:
              'Button labels use foundation text styles aligned to each button size. Font size and line height scale with the size tier; default label weight is Regular (400).',
            demoId: 'button-design-typography',
          },
        ],
      },
    ],
  };
}
