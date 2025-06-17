'use client'

import { Menubar, MenubarMenu, MenubarTrigger } from './menubar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import avatarImage from '../../../public/images/avatarImage.png'
import logoGradient from '../../../public/images/logoGradient.svg'
import React, { ReactNode, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Bell, FolderKanban, Telescope } from 'lucide-react'

type NavbarProps = {
  children?: ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Menubar className="border-none font-satoshi flex flex-row justify-between bg-[#F3F4F6] w-full h-[74px] px-[25px] ">
      {/* Logo and Title */}
      <div className="flex gap-1 items-center">
        <Image src={logoGradient} alt="Logo picture" width={16} height={20} />
        <h1 className="h-full flex items-center text-lg font-medium">
          ThinkStorm
        </h1>
      </div>
      {/* My projects & explore */}
      <MenubarMenu>
        <div className="flex flex-row items-center gap-2 text-base">
          <div className="flex flex-row items-center">
            <MenubarTrigger
              className={`cursor-pointer hover:text-gray-700 gap-2 ${pathname === 'projects' ? 'bg-gray-300' : ''}`}
              onClick={() => router.push('/projects')}
            >
              <FolderKanban />
              My Projects
            </MenubarTrigger>
          </div>

          <div className="flex flex-row items-center ">
            <MenubarTrigger
              className={`hover:text-gray-700 gap-2 ${pathname === 'explore' ? 'bg-gray-300' : ''}`}
              onClick={() => router.push('/explore')}
            >
              <Telescope />
              Explore
            </MenubarTrigger>
          </div>
        </div>
        {/* Notification button & Profile */}

        <div className="flex flex-row items-center ">
          <div className="flex items-center justify-center h-[40px] w-[40px]">
            <button>
              <Bell />
            </button>
          </div>
          <div>
            <Select>
              <SelectTrigger className="border-2 flex items-center border-none shadow-none rounded-full overflow-hidden">
                <Image
                  src={avatarImage}
                  alt="avatar Image Buttom"
                  width={40}
                  height={40}
                />
                {/* <SelectValue placeholder="Recent" /> */}
              </SelectTrigger>
              <SelectContent className="border-none">
                <SelectItem value="recent">Profile</SelectItem>
                <SelectItem value="popular">Settings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </MenubarMenu>
    </Menubar>
  )
}

export default Navbar
