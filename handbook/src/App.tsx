import { Navigate, Route, Routes } from 'react-router-dom';
import { HandbookAppShell } from './components/shell/HandbookAppShell';
import { BaseColorsPage } from './pages/BaseColorsPage';
import { BrandColorsPage } from './pages/BrandColorsPage';
import { DataColorsPage } from './pages/DataColorsPage';
import { NeutralColorsPage } from './pages/NeutralColorsPage';
import { SystemColorsPage } from './pages/SystemColorsPage';
import { TypographyOverviewPage } from './pages/TypographyOverviewPage';
import { TypographyTextStylesPage } from './pages/TypographyTextStylesPage';
import { TypographyTextSystemPage } from './pages/TypographyTextSystemPage';
import { HandbookPlaceholderPage } from './pages/HandbookPlaceholderPage';

export default function App() {
  return (
    <Routes>
      <Route element={<HandbookAppShell />}>
        <Route index element={<Navigate to="/foundation/colours/base" replace />} />
        <Route path="foundation/colours/base" element={<BaseColorsPage />} />
        <Route path="foundation/colours/brand" element={<BrandColorsPage />} />
        <Route path="foundation/colours/system" element={<SystemColorsPage />} />
        <Route path="foundation/colours/neutral" element={<NeutralColorsPage />} />
        <Route path="foundation/colours/data" element={<DataColorsPage />} />
        <Route
          path="foundation/typography/overview"
          element={<TypographyOverviewPage />}
        />
        <Route
          path="foundation/typography/text-styles"
          element={<TypographyTextStylesPage />}
        />
        <Route
          path="foundation/typography/text-system"
          element={<TypographyTextSystemPage />}
        />
        <Route
          path="guidelines"
          element={<HandbookPlaceholderPage title="Guidelines" />}
        />
        <Route
          path="components"
          element={<HandbookPlaceholderPage title="Components" />}
        />
        <Route
          path="templates"
          element={<HandbookPlaceholderPage title="Templates" />}
        />
      </Route>
    </Routes>
  );
}
