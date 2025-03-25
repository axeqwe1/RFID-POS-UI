// app/mainscreen/layout.tsx
import { ReactNode } from 'react';

export default function MainScreenLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1400px] mx-auto">
      <main className="p-4">{children}</main>
    </div>
  );
}