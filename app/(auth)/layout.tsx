import TanStackQueryProvider from '@/providers/TanStackQueryProvider'
import Image from 'next/image'
import { ReactNode } from 'react'
import Flex from '@/components/common/layout/Flex'
import cx from './cx'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <TanStackQueryProvider>
      <div className={cx('Layout')}>
        <Flex.RowCenter className={cx('section')}>
          <section className={cx('logo')}>
            <Image
              src="/logo-gradient.svg"
              alt="logo image"
              width={150}
              height={150}
              priority
            />
          </section>
        </Flex.RowCenter>
        <Flex.RowCenter className={cx('section')}>
          <section className={cx('auth')}>{children}</section>
        </Flex.RowCenter>
      </div>
    </TanStackQueryProvider>
  )
}

export default Layout
