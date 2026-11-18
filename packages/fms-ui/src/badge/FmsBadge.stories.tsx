import type { Meta, StoryObj } from '@storybook/react';
import { FmsBadge } from '@fms/ui';

const meta = {
  title: 'Components/Badge',
  component: FmsBadge,
  args: {
    colorVariant: 'default',
    size: 'base',
    dot: false,
    count: 21,
    overflowCount: 99,
    showZero: false,
  },
  argTypes: {
    colorVariant: { control: 'select', options: ['default', 'primary'] },
    size: { control: 'select', options: ['base', 'small'] },
    dot: { control: 'boolean' },
    count: { control: 'number' },
    overflowCount: { control: 'number' },
    showZero: { control: 'boolean' },
    children: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof FmsBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <FmsBadge {...args} />,
};

/** Mirrors Figma `*Badge* / Basic` variant matrix (`399:66`). */
export const FigmaBasic: Story = {
  name: 'Figma Basic',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: '20px 48px',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <FmsBadge dot colorVariant="default" />
      <FmsBadge dot colorVariant="primary" />
      <FmsBadge count={21} colorVariant="default" size="base" />
      <FmsBadge count={21} colorVariant="primary" size="base" />
      <FmsBadge count={21} colorVariant="default" size="small" />
      <FmsBadge count={21} colorVariant="primary" size="small" />
      <FmsBadge count={120} colorVariant="default" size="base" />
      <FmsBadge count={120} colorVariant="primary" size="base" />
      <FmsBadge count={120} colorVariant="default" size="small" />
      <FmsBadge count={120} colorVariant="primary" size="small" />
    </div>
  ),
};

export const NotificationCounts: Story = {
  name: 'Notification counts',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <p style={{ margin: 0, color: 'rgba(0,0,0,0.55)', fontSize: 14, maxWidth: 420 }}>
        Typical unread / alert counts. Values above <code>overflowCount</code> (default 99) render as{' '}
        <code>99+</code>. Wrap any control or icon with <code>children</code> in product UIs.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <FmsBadge count={1} size="small" colorVariant="default" />
        <FmsBadge count={12} size="small" colorVariant="default" />
        <FmsBadge count={120} size="base" colorVariant="default" />
        <FmsBadge dot colorVariant="primary" size="small" />
        <FmsBadge count={0} showZero size="small" colorVariant="primary" />
      </div>
    </div>
  ),
};