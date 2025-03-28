// pages/RFIDScanScreen.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNav } from '@/app/contexts/NavContext';
import Link from 'next/link';

import { faInfoCircle,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useAlert } from '../contexts/AlertContext';
import { Alert } from '../components/ui/Alert';
import { fetchRFID,restartRFID,stopRFID } from '../lib/api/RFIDapi';
import { ProductinCart } from '../types/ProductInCart';

const RFIDScanScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isScan, setScan] = useState(false);
  const [tagData,setTagData] = useState<Array<ProductinCart>>([])
  const [date,setDate] = useState<string>();
  const router = useRouter()

const handleStopRFID = async () => {
  try {
    await stopRFID();
    console.log('RFID stopped successfully');
  } catch (error) {
    console.error('Error stopping RFID:', error);
    // showAlert({
    //   title: 'ข้อผิดพลาด',
    //   message: 'ไม่สามารถหยุด RFID ได้ กรุณาลองใหม่',
    //   type: 'error',
    //   icon: faExclamationCircle,
    // });
    throw error; // เพื่อให้ caller รู้ว่ามี error
  }
};

  const refNav = useNav();
useEffect(() => {
  const loadTagsData = async () => {
    try {
      const data = await fetchRFID();
      // console.log('Fetched RFID Data:', data)
      // เข้าถึง GETDATA จาก response
      const rfidItems = data;

      // แปลงข้อมูลเป็น ProductInCart
      const productList: ProductinCart[] = [];
      for (let i = 0; i < rfidItems.length; i++) {
        const existingProduct = productList.find(
          (item) =>
            item.ProductName === rfidItems[i].ProductName &&
            item.Size === rfidItems[i].Size &&
            item.Color === rfidItems[i].Color
        );

        if (existingProduct) {
          existingProduct.Qty += 1;
          existingProduct.Total += rfidItems[i].UnitPrice;
        } else {
          const newProduct: ProductinCart = {
            ProductName: rfidItems[i].ProductName,
            Price: rfidItems[i].UnitPrice,
            Qty: 1,
            Size: rfidItems[i].Size,
            Total: rfidItems[i].UnitPrice,
            Color: rfidItems[i].Color,
          };
          productList.push(newProduct);
        }
      }
      // เปรียบเทียบข้อมูลก่อนอัปเดต state
      setTagData((prev) => {
        // ถ้าข้อมูลเหมือนเดิม ไม่ต้องอัปเดต
        if (JSON.stringify(prev) === JSON.stringify(productList)) {
          return prev;
        }
        return productList;
      });

      setScan(productList.length > 0);
    } catch (err: any) {
      console.error('Error fetching RFID data:', err);
    }
  };

  loadTagsData();
  setDate(new Date().toLocaleString());
  // refNav.setOnRestart(() => {
  //     restartRFID()
  //     loadTagsData();
  // })
  const intervalId = setInterval(() => {
    loadTagsData();
    setDate(new Date().toLocaleString());
  }, 1000);

  return () => clearInterval(intervalId);
}, []);

  useEffect(() => {
    refNav.setNavmode(true)
    refNav.setNavname('Add Items')
  },[])
  
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
     router.push('/PaymentScreen')
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
  const { showAlert } = useAlert();

  return (
    
    <div className="main h-full flex flex-col z-0 font-kanit page-card">
      {/* <AnimatePresence>
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
      </AnimatePresence> */}


      <div className="body py-9 px-[4rem] overflow-y-auto h-[calc(100vh-308px)] z-0" style={{ maxHeight: 'calc(100vh-292px)' }}>
        <div className="grid gap-3">
          {tagData.map((item) => (
            <div
              key={item.ProductName + item.Size + item.Color}
              className="bg-base-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold">{item.ProductName}</h2>
                <p className="text-base-content/70 text-lg">
                  Size: {item.Size} | Color: {item.Color}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-medium">
                  {item.Price.toFixed(2)} {scanData.currency}
                </h2>
                <p className="text-base-content/70 text-lg">
                  Qty : {item.Qty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer fixed bottom-0 left-0 right-0 bg-base-100 p-4 shadow-inner border-t h-[210px] z-10">
        <div className="max-w-[1700px] flex justify-between items-center w-full h-full mx-auto px-[1rem]">
          <div className='w-full flex flex-col'>
            <div className="header">
              <p className="text-4xl font-semibold">Items: {tagData.reduce((acc,current) => acc + current.Qty, 0)}</p>
              <p className="text-xl text-base-content/70">
                Scanned at: {date}
              </p>
            </div>
            <div className="footer mt-3">
              <Link onClick={handleStopRFID} href={`/`} className="btn btn-outline btn-error text-3xl h-[90px] w-[40vh] flex justify-center items-center">
                Back
              </Link>
            </div>
          </div>
          {/* <button className="btn btn-outline btn-info" onClick={handleState}>
            test button
          </button> */}
          <div className="flex flex-col w-full items-end">
            <div className="header">
              <p className="text-4xl font-semibold">
                Total: {tagData.reduce((acc,current) => acc + current.Price * current.Qty, 0)} {scanData.currency}
              </p>
              <p className="text-2xl text-base-content">tax: 7%</p>
            </div>
            <div className="footer-t mt-3">
              {tagData.length > 0 ? (
                <button
                  onClick={() => {
                      showAlert({
                          title: 'แจ้งเตือน',
                          message: 'คุณต้องการสั่งซื้อจำนวน 4 ชิ้น หรือไม่?',
                          confirmText: 'ตกลง',
                          cancelText: 'ยกเลิก',
                          type: 'warning',
                          onConfirm: async () => {
                              await handleStopRFID(); // รอให้ handleStopRFID เสร็จ
                              router.push('/PaymentScreen');
                            },
                      }) 
                  }}
                  className="btn btn-outline btn-accent text-3xl h-[90px] w-[40vh] flex justify-center items-center"
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Confirm
                </button>
              ) : (
                <button
                  className="btn btn-outline btn-accent text-3xl h-[90px] w-[40vh] flex justify-center items-center"
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