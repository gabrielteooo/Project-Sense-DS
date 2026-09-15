import { Navigate, Route, Routes } from 'react-router-dom';
import { HandbookAppShell } from './components/shell/HandbookAppShell';
import { BaseColorsPage } from './pages/BaseColorsPage';
import { HandbookPlaceholderPage } from './pages/HandbookPlaceholderPage';

export default function App() {
  return (
    <Routes>
      <Route element={<HandbookAppShell />}>
        <Route index element={<Navigate to="/foundation/colours/base" replace />} />
        <Route path="foundation/colours/base" element={<BaseColorsPage />} />
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
