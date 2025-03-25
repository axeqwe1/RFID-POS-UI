'use client'

// pages/RFIDScanScreen.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNav } from '@/app/contexts/NavContext';

const RFIDScanScreen = () => {
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
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '005',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '006',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '007',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '008',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '009',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '010',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
      {
        id: '011',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
            {
        id: '012',
        name: 'Leather Jacket',
        price: 1999.0,
        size: 'S',
        color: 'Brown',
        style: 'Vintage',
      },
    ],
    total: 3097.0,
    currency: 'THB',
    scanTime: '2025-03-24T10:30:00Z',
    totalItems: 10
  };
  const [isScan,setScan] = useState(false)
  const handdleState = () => {
    setScan(!isScan)
  }
  const refNav = useNav()
  useEffect(() => {
    refNav.setNavmode(true)
    refNav.setNavname('Add Items')
  })
  return (
    <div className="main h-full  flex flex-col">
      {/* ส่วน body: จำกัดความสูงและให้เลื่อนได้ */}
      <div className="body p-6 overflow-y-auto h-[calc(100vh-280px)]" style={{ maxHeight: 'calc(100vh-190px)' }}>
        <div className="grid gap-2">
          {scanData.items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  Size: {item.size} | Color: {item.color} | Style: {item.style}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">
                  {item.price.toFixed(2)} {scanData.currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ส่วน footer: ติดขอบล่าง */}
      <div className="footer fixed bottom-0 left-0 right-0 bg-white p-4 shadow-inner border-t h-[190px]">
        <div className="max-w-[1700px] flex justify-between items-center w-full h-full mx-auto">
            <div>
                <div className="header">
                    <p className="text-3xl font-semibold">
                        Items: {scanData.totalItems}
                    </p>
                    <p className="text-xl text-gray-500">
                        Scanned at: {new Date(scanData.scanTime).toLocaleString()}
                    </p>
                </div>
                <div className="footer mt-3">
                    <button className='btn btn-wide btn-outline btn-error text-3xl h-[60px] flex justify-center items-center'>
                        Back
                    </button>
                </div>
            </div>
            <button className='btn btn-outline btn-info' onClick={handdleState}>
                test button
            </button>
            <div className="flex flex-col">
                <div className="header">
                    <p className="text-3xl font-semibold">
                        Total: {scanData.total.toFixed(2)} {scanData.currency}
                    </p>
                    <p className="text-xl text-black">
                        tax: 7%
                    </p>
                </div>
                <div className="footer mt-3">
                    {isScan ? (
                    <button className='btn btn-wide btn-outline btn-accent text-3xl h-[60px] flex justify-center items-center '>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Confirm
                    </button>
                    ):(
                    <button className='btn btn-wide btn-outline btn-accent text-3xl h-[60px] flex justify-center items-center ' disabled>
                        <span className='loading loading-spinner text-2xl'></span>
                        Scanning
                    </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default RFIDScanScreen