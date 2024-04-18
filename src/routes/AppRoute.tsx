import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 동적 import
const SignUp = React.lazy(() => import('@/pages/SignUpPage'));

export default function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
