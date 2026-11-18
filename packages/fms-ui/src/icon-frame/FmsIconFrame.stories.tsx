import type { Meta, StoryObj } from '@storybook/react';
import { FmsButton, FmsIconFrame } from '@fms/ui';

const meta = {
  title: 'Components/Icon frame',
  component: FmsIconFrame,
  args: {
    name: 'envelope',
    type: 'regular',
    tone: 'default',
    size: 16,
  },
  argTypes: {
    type: { control: 'select', options: ['solid', 'regular', 'brand'] },
    tone: { control: 'select', options: ['default', 'primary', 'onDark', 'inherit'] },
    size: { control: 'select', options: [12, 14, 16] },
    iconClass: { control: 'text' },
    hoverable: { table: { disable: true } },
  },
} satisfies Meta<typeof FmsIconFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    controls: {
      exclude: ['hoverable'],
    },
  },
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <FmsIconFrame name="envelope" type="solid" aria-label="Solid envelope" />
      <FmsIconFrame name="envelope" type="regular" aria-label="Regular envelope" />
      <FmsIconFrame name="github" type="brand" aria-label="GitHub brand" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div
      style={{
        display: 'inline-flex',
        gap: 16,
        padding: 16,
        background: 'rgba(0, 0, 0, 0.88)',
        borderRadius: 8,
      }}
    >
      <FmsIconFrame name="bell" type="regular" tone="onDark" aria-label="Notifications" />
      <FmsIconFrame name="circle-info" type="solid" tone="onDark" aria-label="Info" />
    </div>
  ),
};

export const InheritFromButton: Story = {
  name: 'Inherits parent colour',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <FmsButton icon={<FmsIconFrame name="pen" type="regular" tone="inherit" />}>Edit</FmsButton>
      <FmsButton variant="tertiary" danger icon={<FmsIconFrame name="trash" type="regular" tone="inherit" />}>
        Delete
      </FmsButton>
    </div>
  ),
};

export const Hoverable: Story = {
  args: {
    name: 'magnifying-glass',
    type: 'regular',
    hoverable: true,
    'aria-label': 'Search',
  },
};