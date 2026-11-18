import path from 'node:path';
import { ROOT, readJson, writeJson, getByPath, colorToHex } from './lib/token-utils.mjs';

const foundation = readJson(path.join(ROOT, 'tokens/dist/foundation.resolved.json'));
const radius = readJson(path.join(ROOT, 'tokens/dist/foundation/border-radius.resolved.json'));
const shadows = readJson(path.join(ROOT, 'tokens/effects/shadows.json'));

/** @param {string[]} parts */
function pick(parts) {
  const node = getByPath(foundation, parts);
  if (node && typeof node === 'object' && '$value' in node) {
    return /** @type {{ $value: unknown }} */ (node).$value;
  }
  return node;
}

/** @param {unknown} v */
function hex(v) {
  return colorToHex(v);
}

const borderRadiusNode = radius['Border Radius']?.borderRadius?.$value ?? 6;

const theme = {
  token: {
    colorPrimary: hex(pick(['Colors', 'Brand', 'Primary', 'colorPrimary'])),
    colorPrimaryHover: hex(pick(['Colors', 'Brand', 'Primary', 'colorPrimaryHover'])),
    colorPrimaryActive: hex(pick(['Colors', 'Brand', 'Primary', 'colorPrimaryActive'])),
    colorSuccess: hex(pick(['Colors', 'System', 'Success', 'colorSuccess'])),
    colorWarning: hex(pick(['Colors', 'System', 'Warning', 'colorWarning'])),
    colorError: hex(pick(['Colors', 'System', 'Error', 'colorError'])),
    colorErrorHover: hex(pick(['Colors', 'System', 'Error', 'colorErrorHover'])),
    colorErrorActive: hex(pick(['Colors', 'System', 'Error', 'colorErrorActive'])),
    colorErrorBg: hex(pick(['Colors', 'System', 'Error', 'colorErrorBg'])),
    colorErrorBgHover: hex(pick(['Colors', 'System', 'Error', 'colorErrorBgHover'])),
    /** Ant `Button` text danger pressed uses `colorErrorBgActive` — FMS maps it to error bg hover. */
    colorErrorBgActive: hex(pick(['Colors', 'System', 'Error', 'colorErrorBgHover'])),
    colorErrorBorderHover: hex(pick(['Colors', 'System', 'Error', 'colorErrorBorderHover'])),
    colorInfo: hex(pick(['Colors', 'System', 'Info', 'colorInfo'])),
    colorText: hex(pick(['Colors', 'Neutral', 'Text', 'colorText'])),
    colorTextSecondary: hex(pick(['Colors', 'Neutral', 'Text', 'colorTextSecondary'])),
    colorTextTertiary: hex(pick(['Colors', 'Neutral', 'Text', 'colorTextTertiary'])),
    colorBorder: hex(pick(['Colors', 'Neutral', 'Border', 'colorBorder'])),
    colorBgContainer: hex(pick(['Colors', 'Neutral', 'Bg', 'colorBgContainer'])),
    colorBgLayout: hex(pick(['Colors', 'Neutral', 'Bg', 'colorBgLayout'])),
    colorIcon: hex(pick(['Colors', 'Neutral', 'Icon', 'colorIcon'])),
    colorIconHover: hex(pick(['Colors', 'Neutral', 'Icon', 'colorIconHover'])),
    colorTextLightSolid: hex(pick(['Colors', 'Neutral', 'Text', 'colorTextLightSolid'])),
    fontSizeIcon: pick(['Typography', 'Font Size', 'Icon', '$value']) ?? 14,
    fontFamily: pick(['Typography', 'Font', 'Inter']) ?? 'Inter',
    fontSize: pick(['Typography', 'Font Size', 'Base', '$value']) ?? 16,
    fontSizeSM: pick(['Typography', 'Font Size', 'SM', '$value']) ?? 14,
    fontSizeLG: pick(['Typography', 'Font Size', 'LG', '$value']) ?? 20,
    lineHeight: pick(['Typography', 'Line Height', 'Base', '$value']) ?? 24,
    borderRadius: borderRadiusNode,
    wireframe: false,
    sizeUnit: pick(['Size', 'sizeUnit', '$value']) ?? 4,
    sizeStep: pick(['Size', 'sizeStep', '$value']) ?? 4,
    lineWidth: pick(['Size', 'Line Width', 'lineWidth', '$value']) ?? 1,
    lineWidthBold: pick(['Size', 'Line Width', 'lineWidthBold', '$value']) ?? 2,
    controlOutlineWidth: pick(['Size', 'Line Width', 'controlOutlineWidth', '$value']) ?? 2,
    screenXS: pick(['Size', 'Screen Size', 'screenXS', '$value']) ?? 480,
    screenSM: pick(['Size', 'Screen Size', 'screenSM', '$value']) ?? 576,
    screenMD: pick(['Size', 'Screen Size', 'screenMD', '$value']) ?? 768,
    screenLG: pick(['Size', 'Screen Size', 'screenLG', '$value']) ?? 992,
    screenXL: pick(['Size', 'Screen Size', 'screenXL', '$value']) ?? 1200,
    screenXXL: pick(['Size', 'Screen Size', 'screenXXL', '$value']) ?? 1600,
    boxShadow: shadows.boxshadow?.boxShadow,
    boxShadowSecondary: shadows.boxshadowsecondary?.boxShadow,
    boxShadowTertiary: shadows.boxshadowtertiary?.boxShadow,
  },
  meta: {
    source: 'FMS DS Handbook foundation tokens (light)',
    iconFontFamily: 'Font Awesome 6 Free',
    iconFontFamilyFigma: pick(['Typography', 'Font', 'Icons']),
    fontSizeIcon: pick(['Typography', 'Font Size', 'Icon', '$value']) ?? 14,
  },
};

writeJson(path.join(ROOT, 'tokens/dist/antd/theme.json'), theme);
console.log('Wrote tokens/dist/antd/theme.json');
