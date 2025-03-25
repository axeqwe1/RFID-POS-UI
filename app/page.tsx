// src/app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import  Mainscreen  from './pages/mainscreen/page';
import  Start  from './pages/startscreen/page';
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const buttonVariants = {
    tap: { scale: 0.95, opacity: 0.8 },
  };

  return (
    <Mainscreen>
       <Start/>
    </Mainscreen>
  );
}