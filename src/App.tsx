import React, { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import SpaceBackground from './components/SpaceBackground';

const TypingTest = React.lazy(() => import('./components/TypingTest'));

function App() {
  return (
    <ErrorBoundary>
      <SEO />
      <SpaceBackground />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/70">Yükleniyor...</div>
        </div>
      }>
        <TypingTest />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;