const PaymentPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">주문 상품 정보</h2>
        {/* 장바구니 정보 불러오기 */}
      </div>
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">주문자 정보</h2>
        {/* 사용자 정보 불러오기 */}
        {/* 수정할 수 있어야 함 */}
        {/* 이름 */}
      </div>
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">배송 정보</h2>
        {/* 배송지 카카오 우편번호 api 연동 */}
        {/* {https://postcode.map.daum.net/guide} */}
      </div>
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">최종 결제 금액</h2>
      </div>
    </div>
  );
};

export default PaymentPage;
