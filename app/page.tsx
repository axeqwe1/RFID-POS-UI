// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Start from './startscreen/page';
export default function HomePage() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push('/mainscreen');
  // }, [router]);

  return (
    <div className="max-w-[1400px] mx-auto h-full">
      <Start/>
    </div>
  ); // หรือแสดง loading state
}