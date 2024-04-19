import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const SignUp = React.lazy(() => import('@/pages/SignUpPage'));
const LogIn = React.lazy(() => import('@/pages/LogInPage'));

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
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LogIn />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
