// app/PaymentScreen/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCreditCard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { useCashierCalculator } from '../contexts/CashierCalculatorContext';
import { motion } from 'framer-motion';
import { useNav } from '../contexts/NavContext';
import Link from 'next/link';
import { useEffect } from 'react';
const PaymentScreen = () => {
  const router = useRouter();
  const { showCalculator } = useCashierCalculator();

  const totalAmount = 307000; // ยอดรวม (ตัวอย่าง)
  const refNav = useNav()

  useEffect(() => {
    refNav.setNavmode(false)
    refNav.setNavname("Payment Checkout")
  },[])


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
    <div className="main w-full h-full page-card">
      <div className="max-w-[1700px] px-[3rem] w-full h-[calc(100vh-292px)] py-3 mx-auto">
        <div className="grid grid-cols-2 gap-3 h-full">
          <div className="flex flex-col justify-start items-center border-2 border-gray-100 rounded-md w-full">
            <div className="border-b-2 border-gray-400 w-full">
              <div className="flex flex-row justify-between  mx-auto py-6 px-12">
                <div>
                  <h1 className='text-2xl'>Total Item (10 Item)</h1>
                  <h2 className='text-2xl'>Tax</h2>
                </div>
                <div>
                  <h1 className='text-2xl'>80.00 Bath</h1>
                  <h2 className='text-2xl'>0.00 Bath</h2>
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-between w-full py-6 px-12'>
              <h1 className='text-2xl'>Total</h1>
              <h1 className='text-2xl'>39.00 Bath</h1>
            </div>
          </div>
          <div className="border-2 border-gray-100 rounded-md w-full">
            <div className="flex flex-col justify-center items-center p-3">
              <motion.button
                whileHover={{scale:1.01}}
                whileTap={{scale:0.98}}
                className="btn btn-primary w-full h-[12vh] text-5xl my-2 flex flex-row items-center justify-start px-6 gap-6"
                onClick={handleCashPayment}
              >
                <FontAwesomeIcon icon={faMoneyBill} className="text-5xl" />
                <span className="text-5xl">CASH</span>
              </motion.button>
              <motion.button
                whileHover={{scale:1.01}}
                whileTap={{scale:0.98}}
                className="btn btn-primary w-full h-[12vh] text-5xl my-2 flex flex-row items-center justify-start px-6 gap-6"
                onClick={() => handlePayment('บัตรเครดิต')}
              >
                <FontAwesomeIcon icon={faCreditCard} className="text-5xl" />
                <span className="text-5xl">Credit Card</span>
              </motion.button>
              <motion.button
                whileHover={{scale:1.01}}
                whileTap={{scale:0.98}}
                className="btn btn-primary w-full h-[12vh] text-5xl my-2 flex flex-row items-center justify-start px-6 gap-6"
                onClick={() => handlePayment('QR Code')}
              >
                <FontAwesomeIcon icon={faQrcode} className="text-5xl" />
                <span className="text-5xl">QR Code</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer fixed bottom-0 left-0 right-0 bg-base-100 p-4 shadow-inner border-t h-[190px] z-10">
        <div className="flex justify-between items-center w-full h-full mx-auto px-[1rem] max-w-[1650px]">
          <div className="header flex flex-col h-full w-full justify-between py-3">
            <label className='fieldset-label text-2xl flex flex-row justify-start items-center w-[35%] h-[40px]'>
              <input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-xl border-2" />
                <h1 className='mx-3'>Print Receipt</h1>
            </label>
          {/* <label className="fieldset-label">
            <input type="checkbox" defaultChecked className="checkbox" />
            Remember me
          </label> */}
            <Link href={`/RFIDScanScreen`} className='btn-wide'>
                <button className='btn btn-outline btn-error btn-wide h-[4rem] text-3xl'>Back</button>
            </Link>

          </div>
          <div className="flex flex-row-reverse h-full w-full justify-between py-3">
            <div className="flex flex-col items-end w-full">
              <button className='btn btn-secondary btn-wide h-[4rem] text-3xl' disabled>
                COUPON
              </button>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              {/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;