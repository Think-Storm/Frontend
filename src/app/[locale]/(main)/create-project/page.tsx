'use client'

import BackgroundHeader from '@/components/ui/BackgroundImage'
import bgExplore from '../../../../../public/images/bg-explore.png'
import Navbar from '@/components/ui/MyNavbar'
import ProjectDetailsForm from '@/components/features/auth/components/ProjectDetailsForm'
import MyNavbar from '@/components/ui/MyNavbar'

export default function CreateProject() {
  return (
    <div className="w-full relative">
      <BackgroundHeader bgImage={bgExplore.src}>
        <MyNavbar />
        {/* header container  */}
        <div className="flex items-center justify-center w-full h-12 pt-28 pb-16">
          <div className="">
            <h1 className="text-3xl font-semibold">Create new project</h1>
          </div>
        </div>

        {/* project details form  */}
        <ProjectDetailsForm />
      </BackgroundHeader>
    </div>
  )
}
