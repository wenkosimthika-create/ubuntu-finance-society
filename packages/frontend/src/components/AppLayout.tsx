'use client';

import React, { ReactNode } from 'react';
import ComplianceBanner from './ComplianceBanner';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <ComplianceBanner />
      <div className="min-h-screen bg-white">
        <nav className="bg-forest-green text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Ubuntu Finance Society</h1>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </>
  );
};

export default AppLayout;
