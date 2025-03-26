// app/PaymentScreen/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCreditCard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { useCashierCalculator } from '../contexts/CashierCalculatorContext';

const PaymentScreen = () => {
  const router = useRouter();
  const { showCalculator } = useCashierCalculator();

  const totalAmount = 307000; // ยอดรวม (ตัวอย่าง)

  const handlePayment = async (method: string, amountReceived?: number, change?: number) => {
    console.log(`ชำระเงินด้วย ${method}`);
    if (method === 'เงินสด' && amountReceived !== undefined && change !== undefined) {
      console.log(`รับเงิน: ${amountReceived} THB, เงินทอน: ${change} THB`);
    }
    // ส่งข้อมูลไปยัง PaymentSuccess ผ่าน query parameters
    router.push(
      `/PaymentScreen/PaymentSuccess?method=${encodeURIComponent(method)}&totalAmount=${totalAmount}&amountReceived=${amountReceived || ''}&change=${change || ''}`
    );
  };

  const handleCashPayment = () => {
    showCalculator(totalAmount, (amountReceived, change) => {
      handlePayment('เงินสด', amountReceived, change);
    });
  };

  return (
    <div className="main w-full h-full">
      <div className="max-w-[1700px] px-[3rem] w-full h-[calc(100vh-292px)] py-3 mx-auto">
        <div className="grid grid-cols-2 gap-3 h-full">
          <div className="flex flex-col justify-start items-center border-2 border-gray-100 rounded-md w-full">
            <div className="border-b-2 border-gray-400 w-full">
              <div className="flex flex-row justify-between max-w-[85vh] mx-auto py-6">
                <div>
                  <p>1</p>
                  <p>2</p>
                </div>
                <div>
                  <p>2</p>
                  <p>3</p>
                </div>
              </div>
            </div>
            <div>
              <p>1</p>
            </div>
          </div>
          <div className="border-2 border-gray-100 rounded-md w-full">
            <div className="flex flex-col justify-center items-center p-3">
              <button
                className="btn btn-primary w-full h-[12vh] text-5xl my-2 flex flex-row items-center justify-start px-6 gap-6"
                onClick={handleCashPayment}
              >
                <FontAwesomeIcon icon={faMoneyBill} className="text-5xl" />
                <span className="text-5xl">CASH</span>
              </button>
              <button
                className="btn btn-primary w-full h-[12vh] text-5xl my-2 flex flex-row items-center justify-start px-6 gap-6"
                onClick={() => handlePayment('บัตรเครดิต')}
              >
                <FontAwesomeIcon icon={faCreditCard} className="text-5xl" />
                <span className="text-5xl">Credit Card</span>
              </button>
              <button
                className="btn btn-primary w-full h-[12vh] text-5xl my-2 flex flex-row items-center justify-start px-6 gap-6"
                onClick={() => handlePayment('QR Code')}
              >
                <FontAwesomeIcon icon={faQrcode} className="text-5xl" />
                <span className="text-5xl">QR Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer fixed bottom-0 left-0 right-0 bg-base-100 p-4 shadow-inner border-t h-[190px] z-10">
        <div className="flex justify-between items-center w-full h-full mx-auto px-[1rem]">
          <div className="header">
            <p className="text-4xl font-semibold">Total: {totalAmount.toFixed(2)} THB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;