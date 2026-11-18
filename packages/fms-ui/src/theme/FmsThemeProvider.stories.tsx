import type { Meta, StoryObj } from '@storybook/react';
import { theme as antdSeed } from 'antd';
import { antdTheme } from './antdTheme';

const { useToken } = antdSeed;

function ThemeTokenSwatches() {
  const { token } = useToken();
  const rows: Array<[string, string | number]> = [
    ['colorPrimary', token.colorPrimary],
    ['colorPrimaryHover', token.colorPrimaryHover],
    ['colorPrimaryActive', token.colorPrimaryActive],
    ['colorError', token.colorError],
    ['colorSuccess', token.colorSuccess],
    ['colorWarning', token.colorWarning],
    ['colorBorder', token.colorBorder],
    ['colorBgLayout', token.colorBgLayout],
    ['fontFamily', token.fontFamily],
    ['fontSize', token.fontSize],
    ['lineHeight', token.lineHeight],
    ['controlHeight', token.controlHeight],
    ['controlHeightLG', token.controlHeightLG],
    ['controlHeightSM', token.controlHeightSM],
    ['borderRadius', token.borderRadius],
  ];

  return (
    <div
      style={{
        fontFamily: token.fontFamily,
        color: token.colorText,
        maxWidth: 720,
      }}
    >
      <p style={{ marginTop: 0 }}>
        Runtime tokens after adapting <code>tokens/dist/antd/theme.json</code>. This story
        proves <code>FmsThemeProvider</code> is wired. Do not copy these swatches into
        product screens — wait for approved <code>Fms*</code> components.
      </p>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Token</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Value</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, value]) => (
            <tr key={name} style={{ borderTop: `1px solid ${token.colorBorder}` }}>
              <td style={{ padding: '8px 12px' }}>
                <code>{name}</code>
              </td>
              <td style={{ padding: '8px 12px' }}>{String(value)}</td>
              <td style={{ padding: '8px 12px' }}>
                {typeof value === 'string' && value.startsWith('#') ? (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 28,
                      height: 28,
                      borderRadius: token.borderRadius,
                      background: value,
                      border: `1px solid ${token.colorBorder}`,
                    }}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: token.colorTextSecondary }}>
        Seed primary from generated file:{' '}
        <code>{String(antdTheme.token?.colorPrimary)}</code>
      </p>
    </div>
  );
}

const meta = {
  title: 'Setup/Theme tokens',
  component: ThemeTokenSwatches,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ThemeTokenSwatches>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RuntimeTokens: Story = {};
