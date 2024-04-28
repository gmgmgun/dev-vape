import React from 'react';
import { useUserStore } from '@/store/useUserStore';
import { ROUTES } from './route.constant';
import { Navigate } from 'react-router-dom';

type AggregateComponentProps = {
  component: React.ReactNode;
  page: keyof typeof ROUTES;
};

export const withAggregate = ({ component, page }: AggregateComponentProps) => {
  return <AggregateComponent component={component} page={page} />;
};

// eslint-disable-next-line react-refresh/only-export-components
const AggregateComponent = ({ component, page }: AggregateComponentProps) => {
  const user = useUserStore((state) => state.user);
  const isSeller = user?.isSeller;

  if ((page == 'LOGIN' || page == 'SIGNUP') && user) {
    return <Navigate to="/" />;
  }

  if ((page === 'CART' || page === 'CUSTOMER') && isSeller) {
    return <Navigate to="/" />;
  }

  if (page === 'SELLER' && !isSeller) {
    return <Navigate to="/" />;
  }

  return component;
};

// type withAggregateProps = {
//   component: React.ReactNode;
//   type: keyof typeof ROUTES;
// };

// export const withAggregate = ({ component, type }: withAggregateProps) => {
//   const AggregateComponent = () => {
//     const user = useUserStore((state) => state.user);
//     const isSeller = user?.isSeller;
//     if (type === 'CART' || type === 'CUSTOMER') {
//       if (!isSeller) {
//         return component;
//       }
//     } else if (type === 'SELLER') {
//       if (isSeller) {
//         return component;
//       }
//     }
//   };

//   return React.createElement(AggregateComponent);
// };

// import React from 'react';
// import { ROUTES } from './route.constant';

// type WithAggregateProps = {
//   component: React.ReactNode;
//   type: keyof typeof ROUTES;
//   isSeller: boolean;
// };

// // React 컴포넌트를 반환하는 고차 함수
// export const withAggregate = ({
//   component: Component,
//   type,
//   isSeller,
// }: WithAggregateProps) => {
//   // route 정보를 확인
//   const routeInfo = ROUTES[type];
//   if (!routeInfo) {
//     throw new Error('Provided type does not exist in ROUTES.');
//   }

//   // 로그인이 필요한 페이지이지만, 특정 조건(예: 판매자 또는 일반 사용자)에 따라 접근을 제어
//   return (props: any) => {
//     if (isSeller) {
//       // 판매자 전용 페이지를 처리하는 로직
//       // 예: 판매자 대시보드로 리다이렉트
//       return component;
//     } else {
//       // 고객에 대한 처리, 예를 들어 접근 제한 메시지 표시
//       return component
//     }
//   };
//   // 인증이 필요하지 않은 페이지는 그대로 컴포넌트 반환
//   return <Component {...props} />;
// };
