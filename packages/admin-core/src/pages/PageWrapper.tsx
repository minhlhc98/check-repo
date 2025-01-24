import React, { PropsWithChildren } from 'react';
import Login from './login';
import Dashboard from './dashboard';
import { AdminCoreProvider } from '@/providers/MainProvider';

export const AdminWrapper = ({
  isAuthenticated,
  children,
}: { isAuthenticated: boolean } & PropsWithChildren) => {
  return (
    <AdminCoreProvider>
      {!isAuthenticated ? <Login /> : <Dashboard>{children}</Dashboard>}
    </AdminCoreProvider>
  );
};
