'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import Image from 'next/image'
import avatarImage from '../../../public/images/avatarImage.png'
import logoGradient from '../../../public/images/logoGradient.svg'
import React, { useMemo, useState } from 'react'
import { FolderKanban, Funnel, Search, Telescope } from 'lucide-react'
// import BellButton from './BellButton'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar'
import Link from 'next/link'
import { Fade as Hamburger } from 'hamburger-react'
import { Input } from './input'
import { motion, AnimatePresence } from 'framer-motion'
import FilterSelect from './FilterSelect'
import { FILTERS } from '@/lib/constants/common'
import { useFetchInfiniteProjects } from '@/store/hooks'
import { useDebounce } from 'use-debounce'

const MyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchInfiniteProjects()

  const menuItems = ['My projects', 'Explore']

  const allProjects = data?.pages.flatMap((page) => page.projects) || []

  // const filteredProjects = useMemo(() => {
  //   return allProjects.filter(
  //     (project) =>
  //       project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  //       project.description
  //         .toLowerCase()
  //         .includes(debouncedSearch.toLowerCase()) ||
  //       project.technicalLabels.some((tech) =>
  //         tech.labelName.toLowerCase().includes(debouncedSearch.toLowerCase()),
  //       ),
  //   )
  // }, [])

  return (
    <Navbar
      className="bg-[#F3F4F6] h-[74px]"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <div className="flex gap-1 items-center">
          <Image src={logoGradient} alt="Logo picture" width={16} height={20} />
          <h1 className="h-full flex items-center text-lg font-medium">
            ThinkStorm
          </h1>
        </div>
      </NavbarBrand>
      {/* My projects & explore */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="cursor-pointer hover:text-gray-600 active:text-gray-300 transition duration-300">
          <Link href="/projects" className="flex items-center gap-2">
            <FolderKanban />
            My Projects
          </Link>
        </NavbarItem>
        <NavbarItem className="cursor-pointer hover:text-gray-600 active:text-gray-300 transition duration-300">
          <Link href="/explore" className="flex items-center gap-2">
            <Telescope />
            Explore
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>{/* <BellButton /> */}</NavbarItem>
        <NavbarItem>
          <Select>
            <SelectTrigger className="border-2 flex items-center border-none shadow-none rounded-full overflow-hidden">
              <Image
                src={avatarImage}
                alt="avatar image button"
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
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden h-8 w-8"
          icon={(isOpen) => (
            <Hamburger toggled={isOpen} size={28} color="#000000" />
          )}
        />
      </NavbarContent>

      <NavbarMenu className="bg-gray-100 left-0 right-auto top-[74px] fixed h-full w-full z-50 flex flex-col">
        <div className="flex flex-row w-full">
          <NavbarMenuItem className="w-full">
            <Link
              href="/projects"
              className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
            >
              <FolderKanban className="w-5 h-5 text-gray-600" />
              <span className="text-base">My Projects</span>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="w-full">
            <Link
              href="/explore"
              className="flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
            >
              <Telescope className="w-5 h-5 text-gray-600" />
              <span className="text-base">Explore</span>
            </Link>
          </NavbarMenuItem>
        </div>
        {/* DIVIDER */}
        <div className="h-[1px] bg-gray-200 w-full my-2" />
        <div className="flex flex-row gap-2 justify-between items-center mt-[10px] ">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-[50%] -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <Input
              type="search"
              id="search"
              placeholder="Search"
              className=" pl-8 h-[36px] text-md rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="flex items-center justify-center text-gray-600 rounded-full h-[36px] w-[36px] bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-gray-800 transition duration-300 active:bg-gray-600"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Funnel size={18} />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full mt-2 flex-1"
            >
              <div className="flex flex-col gap-2 w-full">
                {FILTERS.slice(0, 4).map((filter, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="w-full"
                  >
                    <FilterSelect
                      placeholder={filter.placeholder}
                      // icon={filter.icon}
                      options={filter.options}
                      className="h-[36px] rounded-full"
                      // width="100%"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item} - ${index}`}>
            <Link className="w-full" href="#">
              {item}
            </Link>
          </NavbarMenuItem>
        ))} */}
      </NavbarMenu>
    </Navbar>
  )
}
export default MyNavbar
