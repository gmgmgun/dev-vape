import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { useUserStore } from '@/store/useUserStore';

const SignUp = React.lazy(() => import('@/pages/SignUpPage'));
const LogIn = React.lazy(() => import('@/pages/LogInPage'));
const Cart = React.lazy(() => import('@/pages/CartPage'));
const Product = React.lazy(() => import('@/pages/ProductPage'));
const Customer = React.lazy(() => import('@/pages/CustomerPage'));
const Seller = React.lazy(() => import('@/pages/SellerPage'));
const Home = React.lazy(() => import('@/pages/HomePage'));

export default function AppRoute() {
  const user = useUserStore((state) => state.user);
  const userState = user ? user.isSeller : null;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute userState={userState}>
                  <SignUp />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute userState={userState}>
                  <LogIn />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/cart/:userId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute userState={userState}>
                  <Cart />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Product />
              </Suspense>
            }
          />
          <Route
            path="/customer/:customerId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute userState={userState}>
                  <Customer />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/seller/:sellerId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute userState={userState}>
                  <Seller />
                </PrivateRoute>
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
