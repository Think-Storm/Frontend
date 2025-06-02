import localFont from 'next/font/local';

export const satoshi = localFont({
  src: '../../public/fonts/Satoshi-Variable.woff2',
  display: 'swap',
  variable: '--font-satoshi',
});

export const nippo = localFont({
  src: '../../public/fonts/Nippo-Variable.woff2',
  display: 'swap',
  variable: '--font-nippo',
});
