import { Navigate, Route, Routes } from 'react-router-dom';
import { HandbookAppShell } from './components/shell/HandbookAppShell';
import { BaseColorsPage } from './pages/BaseColorsPage';
import { ColoursOverviewPage } from './pages/ColoursOverviewPage';
import { BrandColorsPage } from './pages/BrandColorsPage';
import { DataColorsPage } from './pages/DataColorsPage';
import { NeutralColorsPage } from './pages/NeutralColorsPage';
import { SystemColorsPage } from './pages/SystemColorsPage';
import { TypographyOverviewPage } from './pages/TypographyOverviewPage';
import { TypographyTextStylesPage } from './pages/TypographyTextStylesPage';
import { TypographyTextSystemPage } from './pages/TypographyTextSystemPage';
import { SpacingMarginPage } from './pages/SpacingMarginPage';
import { SpacingOverviewPage } from './pages/SpacingOverviewPage';
import { SpacingPaddingPage } from './pages/SpacingPaddingPage';
import { ElevationOverviewPage } from './pages/ElevationOverviewPage';
import { ElevationShadowPage } from './pages/ElevationShadowPage';
import { LayoutResponsiveGridPage } from './pages/LayoutResponsiveGridPage';
import { FoundationsOverviewPage } from './pages/FoundationsOverviewPage';
import { IconsOverviewPage } from './pages/IconsOverviewPage';
import { IconsDesignerGuidePage } from './pages/IconsDesignerGuidePage';
import { IconsDeveloperGuidePage } from './pages/IconsDeveloperGuidePage';
import { GetStartedDocPage } from './pages/GetStartedDocPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { ContentFormattingPage } from './pages/ContentFormattingPage';
import { DateTimeFormattingPage } from './pages/DateTimeFormattingPage';
import { ResultsFormattingPage } from './pages/ResultsFormattingPage';
import { NumbersFormattingPage } from './pages/NumbersFormattingPage';
import { WritingGuidelinesPage } from './pages/WritingGuidelinesPage';
import { HandbookPlaceholderPage } from './pages/HandbookPlaceholderPage';

export default function App() {
  return (
    <Routes>
      <Route element={<HandbookAppShell />}>
        <Route index element={<Navigate to="/get-started" replace />} />
        <Route path="get-started" element={<GetStartedPage />} />
        <Route
          path="get-started/writing-guidelines"
          element={<WritingGuidelinesPage />}
        />
        <Route
          path="get-started/content-formatting"
          element={<ContentFormattingPage />}
        />
        <Route
          path="get-started/numbers-formatting"
          element={<NumbersFormattingPage />}
        />
        <Route
          path="get-started/date-time-formatting"
          element={<DateTimeFormattingPage />}
        />
        <Route
          path="get-started/results-formatting"
          element={<ResultsFormattingPage />}
        />
        <Route path="get-started/:slug" element={<GetStartedDocPage />} />
        <Route
          path="guidelines"
          element={<Navigate to="/get-started" replace />}
        />
        <Route path="foundation" element={<FoundationsOverviewPage />} />
        <Route
          path="foundation/colours"
          element={<Navigate to="/foundation/colours/overview" replace />}
        />
        <Route path="foundation/colours/overview" element={<ColoursOverviewPage />} />
        <Route path="foundation/colours/base" element={<BaseColorsPage />} />
        <Route path="foundation/colours/brand" element={<BrandColorsPage />} />
        <Route path="foundation/colours/system" element={<SystemColorsPage />} />
        <Route path="foundation/colours/neutral" element={<NeutralColorsPage />} />
        <Route path="foundation/colours/data" element={<DataColorsPage />} />
        <Route
          path="foundation/spacing"
          element={<Navigate to="/foundation/spacing/overview" replace />}
        />
        <Route path="foundation/spacing/overview" element={<SpacingOverviewPage />} />
        <Route path="foundation/spacing/margin" element={<SpacingMarginPage />} />
        <Route path="foundation/spacing/padding" element={<SpacingPaddingPage />} />
        <Route
          path="foundation/elevation"
          element={<Navigate to="/foundation/elevation/overview" replace />}
        />
        <Route
          path="foundation/elevation/overview"
          element={<ElevationOverviewPage />}
        />
        <Route path="foundation/elevation/shadow" element={<ElevationShadowPage />} />
        <Route
          path="foundation/layout"
          element={<Navigate to="/foundation/layout/responsive-grid" replace />}
        />
        <Route
          path="foundation/layout/responsive-grid"
          element={<LayoutResponsiveGridPage />}
        />
        <Route path="foundation/icons/overview" element={<IconsOverviewPage />} />
        <Route
          path="foundation/icons/designer-guide"
          element={<IconsDesignerGuidePage />}
        />
        <Route
          path="foundation/icons/developer-guide"
          element={<IconsDeveloperGuidePage />}
        />
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
