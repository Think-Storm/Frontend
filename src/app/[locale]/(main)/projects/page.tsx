'use client'

import { Button } from '@/components/ui/button'
import Navbar from '@/components/ui/Navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useOutsideClick } from '@/store/hooks'

const projectFilters = ['Created', 'Saved', 'Joined', 'Requested']

export default function MyProjectPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const containerRef = useOutsideClick<HTMLDivElement>(() => {setActiveFilter(null)})
 

  return (
    <div className="w-full relative">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col gap-[40px] mx-[188px] mt-[74px] ">
        {/* header and button container */}
        <div className="flex flex-row items-center justify-between border-2 border-red-500">
          <h1 className="text-3xl font-semibold">My Projects</h1>
          <button className="rounded-md bg-black text-white w-[164px] h-[48px]">
            + Create project
          </button>
        </div>
        {/* filters container */}
        <div className="flex items-center justify-between h-full border-2 border-violet-500 ">
          <div
            className="flex flex-wrap sm:flex-row gap-2 text-black"
            ref={containerRef}
          >
            {projectFilters.map((label) => (
              <Button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`h-[48px] ${
                  activeFilter === label
                    ? 'bg-[#eee] text-black hover:bg-[#eee] hover:text-black'
                    : 'bg-transparent text-black border-none hover:bg-[#eee] hover:text-black'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap sm:flex-row  items-center gap-2 h-[48px] border-2 border-green-400">
            <div className="text-sm font-bold ">Sort by:</div>
            <div className="h-full border-2 border-blue-500">
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
      </div>
    </div>
  )
}
