'use client'

// src/app/pages/about/page.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import { faArrowLeft, faArrowRight, faCreditCard, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNav } from '@/app/contexts/NavContext';
import { useEffect } from 'react';
 const SelectMemberPage = () => {
  const buttonVariants = {
    tap: { scale: 0.95, opacity: 0.8 },
  };
const { setNavname, setNavmode } = useNav();
useEffect(() => {
  setNavname('Self Checkout'); // ถูกต้อง
  setNavmode(false);   // ถูกต้อง
}, []);
  return (
    <div id="about-page" className="max-w-[1300px] mx-auto h-full page-card">
      <div className="w-full h-full pt-[2rem] px-[2rem]">
          <div id="header" className="header flex justify-center items-center">
            <h1 className='text-5xl font-bold text-primary pb-3'>Do You Have a Member?</h1>
          </div>
          <div className="">
            <div className='grid grid-cols-2 gap-6'>
              <div className=" w-full h-full">
                <div className='h-full'>
                  <motion.button 
                  whileHover={{scale:1.02}}
                  whileTap={{scale:0.96}}
                  className="btn btn-soft btn-primary w-full h-full shadow-md" disabled>
                    <h1 className='text-6xl'>Comming Soon</h1>
                  </motion.button>
                  <h1 className='text-6xl text-primary text-center'>YES</h1>
                </div>
              </div>
              <div className=" w-full h-[60vh]">
                  <Link href={`/RFIDScanScreen`}>
                    <div className="h-full">
                        <motion.button 
                        whileHover={{scale:1.02}}
                        whileTap={{scale:0.96}}
                        className="btn btn-soft btn-default w-full h-full shadow-md">
                          <h1 className='text-6xl'>NEXT</h1>
                          <span></span>
                          <FontAwesomeIcon icon={faArrowRight} className='text-6xl'/>
                        </motion.button>
                        <h1 className='text-6xl text-default text-center'>NO</h1>
                    </div>
                  </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SelectMemberPage