import OrderedProductListContainer from '@/components/container/OrderedProductListContainer';

const PaymentPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">배송지</h2>
        {/* 배송지 카카오 우편번호 api 연동 */}
        {/* {https://postcode.map.daum.net/guide} */}
      </div>
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">주문 상품 정보</h2>
        {/* 장바구니 정보 불러오기 */}
        <OrderedProductListContainer />
      </div>
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">결제하기</h2>
      </div>
    </div>
  );
};

export default PaymentPage;
