import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './route.constant';
import { withAggregate } from './withAggregate';

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(ROUTES).map(([key, { path, isAuth, route }]) => {
          const LazyComponent = React.lazy(
            () => import(`@/pages/${route}.tsx`)
          );
          return (
            <Route
              key={key}
              path={path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {isAuth ? (
                    withAggregate({ component: <LazyComponent />, type: key })
                  ) : (
                    <LazyComponent />
                  )}
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
{
  /* <Routes>
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
                {/* 고차함수나 boolean */
}
{
  /* <LogIn />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/cart"
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
        <Route
          path="/seller/add-product"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute userState={userState}>
                <Seller />
              </PrivateRoute>
            </Suspense>
          }
        />
      </Routes> */
}
//     </BrowserRouter>
//   );
// }

// // Container
// const Providers = ({ children }: React.PropsWithChildren) => {
//   // const providers = {
//   //   router: BrowserRouter,
//   //   //... 알아서 매핑

//   // }

//   // return Object.entries(providers).reduceRight()// ... GPT한테 완성해달라하셈.
//   return <BrowserRouter>{children}</BrowserRouter>;
// };
