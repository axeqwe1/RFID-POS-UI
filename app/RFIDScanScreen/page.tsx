// pages/RFIDScanScreen.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNav } from '@/app/contexts/NavContext';
import Link from 'next/link';
import { Modal } from '@/app/components/ui/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert } from '../components/ui/Alert';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import LoadingThreeDotsJumping from '../components/ui/Loading';

const RFIDScanScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isScan, setScan] = useState(true);
  const [isLoading,setLoading] = useState(true)
  const handleState = () => {
    setScan(!isScan);
  };

  const handleRestart = () => {
    setScan(false);
    setIsModalOpen(false);
  };

  const refNav = useNav();
  useEffect(() => {
    refNav.setNavmode(true);
    refNav.setNavname('Add Items');

    const timer = setTimeout(() => {
      setLoading(false)
    },3000)

    return () => clearTimeout(timer)
  }, [refNav]);

  // เพิ่ม/ลบ class modal-open เมื่อ Modal เปิด/ปิด
  // useEffect(() => {
  //   if (isModalOpen) {
  //     document.body.classList.add('modal-open');
  //   } else {
  //     document.body.classList.remove('modal-open');
  //   }

  //   // Cleanup เมื่อ component unmount
  //   return () => {
  //     document.body.classList.remove('modal-open');
  //   };
  // }, [isModalOpen]);

  const scanData = {
    items: [
      {
        id: '001',
        name: 'Cotton T-Shirt',
        price: 299.0,
        size: 'M',
        color: 'Blue',
        style: 'Casual',
      },
      {
        id: '002',
        name: 'Denim Jeans',
        price: 799.0,
        size: 'L',
        color: 'Black',
        style: 'Slim Fit',
      },
      {
        id: '003',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '004',
        name: 'Wool Sweater',
        price: 599.0,
        size: 'M',
        color: 'Gray',
        style: 'Cozy',
      },
      {
        id: '005',
        name: 'Chino Pants',
        price: 699.0,
        size: 'L',
        color: 'Khaki',
        style: 'Casual',
      },
      {
        id: '006',
        name: 'Silk Scarf',
        price: 199.0,
        size: 'One Size',
        color: 'Red',
        style: 'Elegant',
      },
      {
        id: '007',
        name: 'Sneakers',
        price: 999.0,
        size: '42',
        color: 'White',
        style: 'Sporty',
      },
      {
        id: '008',
        name: 'Hoodie',
        price: 499.0,
        size: 'M',
        color: 'Black',
        style: 'Casual',
      },
      {
        id: '009',
        name: 'Blazer',
        price: 1499.0,
        size: 'S',
        color: 'Navy',
        style: 'Formal',
      },
      {
        id: '010',
        name: 'Polo Shirt',
        price: 399.0,
        size: 'M',
        color: 'Green',
        style: 'Casual',
      },
      {
        id: '011',
        name: 'Leather Belt',
        price: 299.0,
        size: 'L',
        color: 'Black',
        style: 'Classic',
      },
      {
        id: '012',
        name: 'Winter Coat',
        price: 2499.0,
        size: 'L',
        color: 'Dark Gray',
        style: 'Warm',
      },
    ],
    total: 3097.0,
    currency: 'THB',
    scanTime: '2025-03-24T10:30:00Z',
    totalItems: 10,
  };

  const handleConfirmTransaction = () => {
    console.log('Transaction confirmed!');
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    
    <div className="main h-full flex flex-col z-0 font-kanit scrollbar-gutter">
      <AnimatePresence>
        {isAlertOpen && (
            <Alert
              isOpen={isAlertOpen}
              onClose={() => setIsAlertOpen(false)}
              onConfirm={handleConfirmTransaction}
              title="ยืนยันการสั่งซื้อ"
              message="คุณต้องการยืนยันการสั่งซื้อจำนวน 307,000 THB หรือไม่?"
              confirmText="ยืนยัน"
              cancelText="ยกเลิก"
              type="success"
              icon={faInfoCircle} // กำหนด Icon ที่ต้องการ
              autoClose={0} // ตั้งค่า 0 เพื่อไม่ให้ปิดอัตโนมัติ
            />

        )}
      </AnimatePresence>
      <div className="body py-9 px-[4rem] overflow-y-auto h-[calc(100vh-345px)] z-0" style={{ maxHeight: 'calc(100vh-300px)' }}>
        <div className="grid gap-3">
          {scanData.items.map((item) => (
            <div
              key={item.id}
              className="bg-base-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p className="text-base-content/70 text-lg">
                  Size: {item.size} | Color: {item.color} | Style: {item.style}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-medium">
                  {item.price.toFixed(2)} {scanData.currency}
                </h2>
                <p className="text-base-content/70 text-lg">
                  Qty : 10
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer fixed bottom-0 left-0 right-0 bg-base-100 p-4 shadow-inner border-t h-[260px] z-10">
        <div className="max-w-[1700px] flex justify-between items-center w-full h-full mx-auto px-[3rem]">
          <div className='w-full flex flex-col'>
            <div className="header">
              <p className="text-3xl font-semibold">Items: {scanData.totalItems}</p>
              <p className="text-xl text-base-content/70">
                Scanned at: {new Date(scanData.scanTime).toLocaleString()}
              </p>
            </div>
            <div className="footer mt-3">
              <Link href={`/`} className="btn btn-outline btn-error text-3xl h-[100px] w-[40vh] flex justify-center items-center">
                Back
              </Link>
            </div>
          </div>
          <button className="btn btn-outline btn-info" onClick={handleState}>
            test button
          </button>
          <div className="flex flex-col w-full items-end">
            <div className="header">
              <p className="text-4xl font-semibold">
                Total: {scanData.total.toFixed(2)} {scanData.currency}
              </p>
              <p className="text-2xl text-base-content">tax: 7%</p>
            </div>
            <div className="footer-t mt-3">
              {isScan ? (
                <button
                  onClick={() => {
                    console.log('Opening modal');
                    setIsAlertOpen(true);
                  }}
                  className="btn btn-outline btn-accent text-3xl h-[100px] w-[40vh] flex justify-center items-center"
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Confirm
                </button>
              ) : (
                <button
                  className="btn btn-outline btn-accent text-3xl h-[100px] w-[40vh] flex justify-center items-center"
                  disabled
                >
                  <span className="loading loading-spinner text-2xl"></span>
                  Scanning
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFIDScanScreen;