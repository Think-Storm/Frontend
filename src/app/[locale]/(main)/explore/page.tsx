'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import iconSearch from '../../../../../public/images/iconSearch.png';
import FilterSelect from '@/components/ui/FilterSelect';
import { FILTERS } from '@/lib/constants/common';
import ProjectCard from '@/components/ui/ProjectCard';
import Navbar from '@/components/ui/Navbar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFetchInfiniteProjects, useFetchProjects, useOutsideClick } from '@/store/hooks';
import BackgroundHeader from '@/components/ui/BackroundHeader';
import bgExplore from '../../../../../public/images/bg-explore.png';
import { useInView } from 'react-intersection-observer';
import InfiniteScrollSpin from '@/components/ui/InfiniteScrollSpin';

export default function ExplorePage() {
  // const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useFetchInfiniteProjects();

  const allProjects = data?.pages.flatMap((page) => page.projects) || [];

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
            <ProjectCard projects={allProjects} isLoading={isLoading} error={error} />
            {/* Infinite scroll animation */}
            <InfiniteScrollSpin
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </div>
      </BackgroundHeader>
    </div>
  );
}
