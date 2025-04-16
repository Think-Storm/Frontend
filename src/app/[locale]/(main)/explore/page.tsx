'use client'

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import iconSearch from '../../../../../public/images/iconSearch.png'
import FilterSelect from '@/components/ui/FilterSelect'
import { FILTERS, PROJECTS } from '@/lib/constants/common'
import ProjectCard from '@/components/ui/ProjectCard'
import Navbar from '@/components/ui/Navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ExplorePage() {
  const [filter, setFilter] = useState('All')

  const filteredProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.type === filter)

  return (
    <div className="w-full relative">
      {/* Navbar */}
      <Navbar />
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
          <div className="flex flex-col gap-4">
            {/* Search Bar & sort by filter*/}
            <div className="flex flex-row justify-between ">
              <input
                type="text"
                placeholder="Search"
                className="w-full max-w-[524px] h-[48px] p-2 border rounded-md border-[#EEE] bg-no-repeat bg-left pl-10 focus:outline-gray-300"
                style={{
                  backgroundImage: `url(${iconSearch.src})`,
                  backgroundSize: '19px 19px',
                  backgroundPosition: '10px center',
                }}
              />
              <div className="flex flex-row justify-center items-center gap-2 h-[48px]">
                <div className="text-sm font-bold ">Sort by:</div>
                <div className="h-full ">
                  <Select>
                    <SelectTrigger className="w-[113px]">
                      <SelectValue placeholder="Recent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* filters */}
            <div className="flex flex-wrap gap-6 sm:flex-row h-[48px] ">
              {FILTERS.slice(0, 4).map((filter, index) => (
                <FilterSelect
                  key={index}
                  placeholder={filter.placeholder}
                  options={filter.options}
                />
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <ProjectCard />
        </div>
      </div>
    </div>
  )
}
