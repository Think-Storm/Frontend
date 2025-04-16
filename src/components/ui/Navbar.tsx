'use client'

import { Menubar, MenubarMenu, MenubarTrigger } from './menubar'
import Image from 'next/image'
import iconMenu from '../../../public/images/iconMenu.png'
import iconWorld from '../../../public/images/iconWorld.png'
import notificationIcon from '../../../public/images/notificationIcon.png'
import avatarImage from '../../../public/images/avatarImage.png'
import logoGradient from '../../../public/images/logoGradient.png'
import React, { ReactNode, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type NavbarProps = {
  children?: ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Menubar className="border-none flex flex-row justify-between gap-2 bg-[#F3F4F6] w-full h-[74px] px-[25px]">
      {/* Logo and Title */}
      <div className="flex items-center justify-baseline flex-row gap-2">
        <Image src={logoGradient} alt="Logo picture" width={16} height={20} />
        <div className="w-[136px] h-[20px]">
          <h1 className="text-xl">ThinkStorm</h1>
        </div>
      </div>
      {/* My projects & explore */}
      <MenubarMenu>
        <div className="flex flex-row items-center gap-2 text-base ">
          <div className="flex flex-row items-center">
            <MenubarTrigger
              className={`gap-2 ${pathname === 'projects' ? 'bg-gray-300' : ''}`}
              onClick={() => router.push('/projects')}
            >
              <Image src={iconMenu} alt="Menu Icon" width={20} height={18} />
              My Projects
            </MenubarTrigger>
          </div>

          <div className="flex flex-row items-center">
            <MenubarTrigger
              className={`gap-2 ${pathname === 'explore' ? 'bg-gray-300' : ''}`}
              onClick={() => router.push('/explore')}
            >
              <Image src={iconWorld} alt="World Icon" width={20} height={18} />
              Explore
            </MenubarTrigger>
          </div>
        </div>
        {/* Notification button & Profile */}
        <div className="flex flex-row items-center gap-[18px] ">
          <div className="flex items-center justify-center h-[40px] w-[40px]">
            <button>
              <Image
                src={notificationIcon}
                alt="Notification Icon Button"
                width={18}
                height={20}
              />
            </button>
          </div>
          <div>
            <button>
              <Image
                src={avatarImage}
                alt="avatar Image Buttom"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </MenubarMenu>
    </Menubar>
  )
}

export default Navbar
