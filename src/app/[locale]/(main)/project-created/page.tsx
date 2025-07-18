'use client'

import BackgroundHeader from '@/components/ui/BackgroundHeader'
import bgExplore from '../../../../../public/images/bg-explore.png'
import Navbar from '@/components/ui/MyNavbar'

const ProjectCreated = () => {
  return (
    <div className="w-full relative">
      <BackgroundHeader bgImage={bgExplore.src}>
        <Navbar />
        {/* header container  */}
      </BackgroundHeader>
    </div>
  )
}

export default ProjectCreated
