import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FmsButton } from '@fms/ui';

const meta = {
  title: 'Components/Button',
  component: FmsButton,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'base',
    danger: false,
    disabled: false,
    loading: false,
    iconOnly: false,
    iconClass: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
    size: {
      control: 'select',
      options: ['base', 'small', 'x-small'],
    },
    danger: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    iconClass: {
      control: 'text',
      description: 'Font Awesome classes, e.g. fa-regular fa-magnifying-glass',
    },
    children: { control: 'text' },
    icon: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof FmsButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    iconClass: 'fa-regular fa-magnifying-glass',
  },
};

const SEARCH = 'fa-regular fa-magnifying-glass';
const PEN = 'fa-regular fa-pen';

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <FmsButton variant="primary">Primary</FmsButton>
      <FmsButton variant="secondary">Secondary</FmsButton>
      <FmsButton variant="tertiary">Tertiary</FmsButton>
      <FmsButton variant="link">Link</FmsButton>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    variant: "secondary"
  },

  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <FmsButton size="base">Base</FmsButton>
      <FmsButton size="small">Small</FmsButton>
      <FmsButton size="x-small">X-Small</FmsButton>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, color: 'rgba(0,0,0,0.55)' }}>
        Hover and pressed are CSS. Use the buttons below — do not look for a state control.
      </p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <FmsButton>Default</FmsButton>
        <FmsButton disabled>Disabled</FmsButton>
        <FmsButton loading>Loading</FmsButton>
      </div>
    </div>
  ),
};

export const Content: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <FmsButton>Basic</FmsButton>
      <FmsButton iconClass={PEN}>With icon</FmsButton>
      <FmsButton iconOnly iconClass={SEARCH} aria-label="Search" />
    </div>
  ),
};

export const Danger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <FmsButton variant="primary" danger>
        Delete
      </FmsButton>
      <FmsButton variant="secondary" danger>
        Reject
      </FmsButton>
      <FmsButton variant="tertiary" danger>
        Remove
      </FmsButton>
      <FmsButton variant="link" danger>
        Delete
      </FmsButton>
    </div>
  ),
};

export const FormActions: Story = {
  name: 'Form actions',
  render: function FormActionsStory() {
    const [saved, setSaved] = useState(false);
    const [busy, setBusy] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <p style={{ margin: 0 }}>
          {saved ? 'Saved.' : 'Edit the record, then save or cancel. Delete is a danger action.'}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <FmsButton
            variant="primary"
            loading={busy}
            onClick={() => {
              setBusy(true);
              window.setTimeout(() => {
                setBusy(false);
                setSaved(true);
              }, 600);
            }}
          >
            Save
          </FmsButton>
          <FmsButton
            variant="secondary"
            onClick={() => {
              setSaved(false);
            }}
          >
            Cancel
          </FmsButton>
          <FmsButton variant="tertiary" danger>
            Delete
          </FmsButton>
        </div>
      </div>
    );
  },
};
