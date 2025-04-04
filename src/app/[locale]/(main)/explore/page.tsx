'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import logoGradient from '../../../../../public/images/logoGradient.png'
import iconMenu from '../../../../../public/images/iconMenu.png'
import iconWorld from '../../../../../public/images/iconWorld.png'
import notificationIcon from '../../../../../public/images/notificationIcon.png'
import avatarImage from '../../../../../public/images/avatarImage.png'
import iconSearch from '../../../../../public/images/iconSearch.png'
import FilterSelect from '@/components/ui/FilterSelect'
import { FILTERS } from '@/lib/constants/common'

const projects = [
  {
    title: 'Generative AI/LLM Project —looking for volunteers',
    type: 'Educational',
    skills: ['Software Dev', 'Design', 'AI/Data'],
    icons: ['TS', 'React', 'AWS'],
  },
  {
    title: 'Generative AI/LLM Project —looking for volunteers',
    type: 'Educational',
    skills: ['Software Dev', 'Cloud/DevOps', 'Blockchain/Security'],
    icons: ['Node', 'Vue', 'Azure'],
  },
]

export default function ExplorePage() {
  const [filter, setFilter] = useState('All')

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.type === filter)

  return (
    <div className="w-full relative">
      {/* Navbar */}
      <Menubar className="border-none flex flex-row justify-between gap-2 bg-[#F3F4F6] w-full h-[74px]">
        {/* Logo and Title */}
        <div className="flex items-center justify-baseline flex-row gap-2">
          <Image src={logoGradient} alt="Logo picture" width={16} height={20} />
          <div className="w-[136px] h-[20px]">
            <h1 className="text-xl">ThinkStorm</h1>
          </div>
        </div>
        {/* My projects & explore */}
        <MenubarMenu>
          <div className="flex flex-row items-center gap-2 text-base">
            <div className="flex flex-row items-center">
              <MenubarTrigger className="gap-2">
                <Image src={iconMenu} alt="Menu Icon" width={20} height={18} />
                My Projects
              </MenubarTrigger>
            </div>

            <div className="flex flex-row items-center">
              <MenubarTrigger className="gap-2">
                <Image
                  src={iconWorld}
                  alt="World Icon"
                  width={20}
                  height={18}
                />
                Explore
              </MenubarTrigger>
            </div>
          </div>
          {/* Notification button & Profile */}
          <div className="flex flex-row items-center gap-[18px]">
            <div>
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
      <Image
        src="/images/bg-explore.png"
        alt="Header Background"
        width={1440}
        height={384}
        className="w-full -z-10 object-cover absolute top-0 left-0 mt-[74px]"
      />
      {/* Header and Filters Section */}
      <div className="relative w-full h-48">
        <div className="mx-[188px]">
          <div className="pt-[40px]">
            <h1 className="text-3xl font-semibold mb-[40px]">Explore</h1>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-[524px] h-[48px] p-2 mb-4 border rounded-md border-[#EEE] bg-no-repeat bg-left pl-10 focus:outline-gray-300"
            style={{
              backgroundImage: `url(${iconSearch.src})`,
              backgroundSize: '19px 19px',
              backgroundPosition: '10px center',
            }}
          />
          <div className="flex flex-wrap gap-4 sm:flex-row">
            {FILTERS.map((filter, index) => (
              <FilterSelect
                key={index}
                placeholder={filter.placeholder}
                options={filter.options}
              />
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredProjects.map((project, index) => (
              <div key={index} className="p-4 border rounded-md shadow-md">
                <span className="text-sm font-semibold bg-gray-200 p-1 rounded">
                  {project.type}
                </span>
                <h2 className="text-xl font-bold mt-2">{project.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Lorem ipsum dolor sit amet...
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
