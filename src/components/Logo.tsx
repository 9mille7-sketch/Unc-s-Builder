import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <div className="flex justify-center items-center py-8">
      <Image
        src="/Logo1.png"
        alt="UNC Builder Logo"
        width={256}
        height={256}
        priority
        style={{ maxWidth: '320px', width: '100%', height: 'auto' }}
      />
    </div>
  );
}
