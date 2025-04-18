import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { AppProviders } from './providers';
import { router } from './router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>,
);
