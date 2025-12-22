import { ErrorBoundary } from './shared';
import { AppRoutes } from './app/routes';
import { QueryProvider } from './app/providers';

export const App = () => (
  <ErrorBoundary>
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  </ErrorBoundary>
);

export default App;
