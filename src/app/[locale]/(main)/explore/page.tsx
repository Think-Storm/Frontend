'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import iconSearch from '../../../../../public/images/iconSearch.png'
import FilterSelect from '@/components/ui/FilterSelect'
import { FILTERS } from '@/lib/constants/common'
import ProjectCard from '@/components/ui/ProjectCard'
import Navbar from '@/components/ui/Navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFetchProjects, useOutsideClick } from '@/store/hooks'
import BackgroundHeader from '@/components/ui/BackroundHeader'
import bgExplore from '../../../../../public/images/bg-explore.png'

export default function ExplorePage() {
  // const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const limit = 9
  const { data: response, isLoading, error } = useFetchProjects(page, limit)

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    if (response && page < response.totalPages) setPage(page + 1)
  }

  return (
    <div className="flex w-full relative items-center justify-center ">
      <BackgroundHeader bgImage={bgExplore.src}>
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

        <div className="flex flex-col w-full  items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className=" w-full ">
            <div className="flex pt-10">
              <h1 className="text-3xl font-semibold mb-10">Explore</h1>
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
                <div className="flex flex-row justify-center items-center gap-2 h-[48px] ">
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
              <div className="flex justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-8 h-[48px]">
                {FILTERS.slice(0, 4).map((filter, index) => (
                  <FilterSelect
                    key={index}
                    placeholder={filter.placeholder}
                    options={filter.options}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Projects & pagination container */}
          <div className="">
            <ProjectCard
              projects={response?.projects || []}
              isLoading={isLoading}
              error={error}
            />
            {/* Pagination control */}

            {response && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span>
                  Page {page} of {response.totalPages || 1}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= (response.totalPages || 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </BackgroundHeader>
    </div>
  )
}
