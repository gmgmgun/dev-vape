export const ROUTES: Routes = {
  HOME: { path: '/', route: 'HomePage' },
  SIGNUP: { path: '/signup', route: 'SignUpPage' },
  LOGIN: { path: '/login', route: 'LogInPage' },
  PRODUCT: {
    path: '/product/:productId',
    route: 'ProductPage',
  },
  CUSTOMER: {
    path: '/customer/:customerId',
    route: 'CustomerPage',
  },
  SELLER: {
    path: '/seller/:sellerId',
    route: 'SellerProfilePage',
  },
  ADDPRODUCT: {
    path: '/seller/:sellerId/add-product/',
    route: 'AddProductPage',
  },
  EDITPRODUCT: {
    path: '/seller/:sellerId/edit-product/:productId',
    route: 'EditProductPage',
  },
  CART: { path: '/cart/:cartId', route: 'CartPage' },
} as const;

interface Route {
  path: string;
  route: string;
}

interface Routes {
  [key: string]: Route;
}

/////////////////////////////////////////////////////////////////
// import { ROUTES } from '~~';

// interface WithAggregateProps {
//   component: React.ReactNode;
//   type?: 'SELLER' | 'CUSTOMER';
//   isSeller:
// }
// /**
//  *
//  */
// const withAggregate = ({ component, type }: WithAggregateProps) => {
//   if (
//     ROUTES.LOGIN ||
//     ROUTES.SELLER // ...............
//   ) {
//     // 맞는 경우 컴포넌트

//     return; // seller인 경우

//     return; // customer인 경우
//   }

// throw new CustomError({
//   name: 'Aggregate Error',
//   message: 'Aggregate의 상수 값에 없는 타입입니다.',
// });
// };

// 정적 팩토리 메서드 패턴 또는 정적 메서드 패턴. 에러 많이 안만들었으면 걍 객체 쓰던가 그냥 AggregateError만 export
// const CustomError = {
//   Aggregate: AggregateError,
// };

// class AggregateError extends Error {
//   constructor({ name, message }) {
//     this.name = '[AggregateError]';
//   }
// }

// const AGGREGATE_TYPE = {
//   SELLER: 'SELLER',
//   CUSTOMER: 'CUSTOMER',
// } as const;

///////////////////////////////////

// describe('withAggregate 테스트', () => {
//   desribe('주입받은 type에 따라 올바른 컴포넌트를 렌더링한다', () => {
//     //사실 1:1 대응이라 테케 여러개 짤 필요 없음 그냥 보여주기용
//     // given
//     const testCases = [
//       {
//         aggregateType: AGGREGATE_TYPE.CUSTOMER,
//         expected: '~~',
//       },
//       {
//         aggregateType: AGGREGATE_TYPE.SELLER,
//         expected: '~~',
//       },
//     ];

//     let Component;

//     beforeEach(() => {
//       const newComponent = getNewComponent();
//       Component = newComponent;
//     });

//     test.each(testCases)(
//       'type으로 $aggregateType이 들어오면 반환되는 값은 $expected이어야 한다',
//       ({ aggregateType, expected }) => {
//         // when
//         const enhancedComponent = withAggregate({
//           component: Component,
//           type: aggregateType,
//         });

//         // then
//         expect(enhancedComponent).toEqual(expected);
//       }
//     );
//   });

//   // Line 에러 테스트는 prototype이 아니라 그냥 Error 확인하는데, 이 방식도 괜춘
//   // https://github.com/line/line-bot-sdk-nodejs/blob/master/test/middleware.spec.ts
//   desribe('예외처리 테스트', () => {
//     describe('주입받은 type이 없는 경우, 예외처리 한다.', () => {
//       const testCases = [
//         {
//           aggregateType: undefined,
//           // 상속 + 정적 팩토리 메서드 패턴(매핑만 해줘서 prototype 안 변한 경우) 쓴 경우 Protype으로 체크
//           expectedError: CustomError.Aggregate,
//         },
//       ];

//       // 에러 테스트 알아서 하셈
//     });
//   });
// });
