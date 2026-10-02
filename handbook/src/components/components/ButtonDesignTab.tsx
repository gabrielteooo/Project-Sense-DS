import { DesignTabPage } from '../design-tab/DesignTabPage';
import { loadButtonDesignTabDocument } from '../design-tab/loadButtonDesignTab';

/** Button — Design tab (Figma 115:606) via shared design-tab template. */
export function ButtonDesignTab() {
  const document = loadButtonDesignTabDocument();
  return <DesignTabPage document={document} />;
}
