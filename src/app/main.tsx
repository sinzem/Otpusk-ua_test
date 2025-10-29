import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/api/query-client.ts';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router}/>
    </QueryClientProvider> 
  </StrictMode>,
)
