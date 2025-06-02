import React from 'react';
import { BackgroundHeaderProps } from '@/lib/utils/types';

const BackgroundHeader = ({ bgImage, height = 'h-[384px]', children }: BackgroundHeaderProps) => {
  return (
    <div
      className={`relative w-full ${height}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundHeader;
