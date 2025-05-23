// src/components/ui/Navbar.tsx
'use client';

import React from 'react';
import { useNav } from '@/app/contexts/NavContext';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const { navname, navmode,Restart,Stop } = useNav();
  return (
    <div className="fixed inset-0 z-[9888] bg-base-200 shadow-sm h-[100px] flex justify-center items-center">
      <div className="navbar max-w-[1800px] mx-auto px-[3rem]">
        <div className="navbar-start flex items-center">
          <Link href="/" onClick={Stop}>
            <Image
              src="/image/logo/NDS_Logo.jpeg"
              alt="NDS Logo"
              width={120}
              height={70}
              className="mr-[10px]"
              priority
            />
          </Link>
          <h1 className="text-3xl text-primary font-bold">{navname}</h1>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        {navmode ? (
          <div className="navbar-end">
              <button onClick={Restart} className="border-3 btn btn-soft btn-primary w-[240px] h-[80px] font-medium text-3xl">
                Restart
              </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Navbar