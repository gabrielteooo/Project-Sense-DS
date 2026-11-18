import type { Meta, StoryObj } from '@storybook/react';
import { FmsBreadcrumbLink, FmsBreadcrumbs } from '@fms/ui';
import { FIGMA_BASIC_BREADCRUMB_ITEMS } from './figmaBasicItems';

const meta = {
  title: 'Components/Breadcrumbs',
  component: FmsBreadcrumbs,
  args: {
    separator: '/',
    items: FIGMA_BASIC_BREADCRUMB_ITEMS,
  },
  argTypes: {
    separator: { control: 'text' },
    items: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof FmsBreadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

type PlaygroundArgs = { separator?: string; showHomeIcon?: boolean };

export const Playground: Story = {
  args: {
    separator: '/',
    showHomeIcon: true,
  } as PlaygroundArgs,
  argTypes: {
    showHomeIcon: { control: 'boolean', description: 'Leading icon on first crumb (Figma Icon)' },
  } as Story['argTypes'],
  render: (args) => {
    const { separator = '/', showHomeIcon = true } = args as PlaygroundArgs;
    return (
      <FmsBreadcrumbs
        separator={separator}
        items={[
          { label: 'Home', href: '#', icon: showHomeIcon, iconName: 'house' },
          { label: 'Breadcrumb Link', href: '#' },
          { label: 'Breadcrumb Link', href: '#' },
          { label: 'Breadcrumb Link', current: true },
        ]}
      />
    );
  },
};

export const FigmaBasic: Story = {
  name: 'Figma Basic',
  render: () => <FmsBreadcrumbs items={FIGMA_BASIC_BREADCRUMB_ITEMS} />,
};

export const BreadcrumbLinkStates: Story = {
  name: 'Breadcrumb Link',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <FmsBreadcrumbLink label="Breadcrumb Link" href="#" icon iconName="house" />
      <FmsBreadcrumbLink label="Breadcrumb Link" href="#" />
      <FmsBreadcrumbLink label="Breadcrumb Link" current />
    </div>
  ),
};

export const PageTrail: Story = {
  name: 'Page trail',
  render: function PageTrailStory() {
    return (
      <div style={{ maxWidth: 640 }}>
        <FmsBreadcrumbs
          items={[
            { label: 'Home', href: '#', icon: true, iconName: 'house' },
            { label: 'Breadcrumb Link', href: '#' },
            { label: 'Breadcrumb Link', href: '#' },
            { label: 'Edit user', current: true },
          ]}
        />
        <p style={{ margin: '16px 0 0', color: 'rgba(0,0,0,0.55)', fontSize: 14 }}>
          Tab through links, activate with Enter. Hover a link for the text-hover background. The last
          item is the current page (no link).
        </p>
      </div>
    );
  },
};