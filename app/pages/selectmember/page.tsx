'use client'

// src/app/pages/about/page.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import { faArrowLeft, faArrowRight, faCreditCard, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNav } from '@/app/contexts/NavContext';
import { useEffect } from 'react';
export default function SelectMemberPage() {
  const buttonVariants = {
    tap: { scale: 0.95, opacity: 0.8 },
  };
const { setNavname, setNavmode } = useNav();
useEffect(() => {
  setNavname('Self Checkout'); // ถูกต้อง
  setNavmode(false);   // ถูกต้อง
}, []);
  return (
    <div id="about-page" className="max-w-[1300px] mx-auto py-12 h-full">
      <div className="w-full h-full">
          <div id="header" className="header flex justify-center items-center">
            <h1 className='text-5xl font-bold text-primary'>Do You Have a Member?</h1>
          </div>

          <div className="main grid grid-cols-2 gap-6 py-12">
              <div className=" bg-base-100 shadow-xl w-full h-full">
                <button className="btn btn-outline btn-primary w-full h-full">
                    <h1 className='text-6xl'>Scan in something</h1>
                </button>
                <h1 className='text-6xl text-center py-4 text-primary'>YES</h1>
              </div>
              <div className="bg-base-100 shadow-sm w-full h-[60vh]">
                  <Link href={`/pages/RFIDScanScreen`}>
                  <button className="btn btn-outline btn-default w-full h-full">
                    <h1 className='text-6xl'>NEXT</h1>
                    <span></span>
                    <FontAwesomeIcon icon={faArrowRight} className='text-6xl'/>
                  </button>
                  </Link>
                  <h1 className='text-6xl text-center py-4'>NO</h1>
              </div>
          </div>
      </div>
    </div>
  );
}