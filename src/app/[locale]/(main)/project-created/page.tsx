'use client'

import BackgroundImage from '@/components/ui/BackgroundImage'
import bgExplore from '../../../../../public/images/bg-explore.png'
import MyNavbar from '@/components/ui/MyNavbar'

const ProjectCreated = () => {
  return (
    <div className="w-full relative">
      <BackgroundImage bgImage={bgExplore.src} height={''}>
        <MyNavbar />
        {/* header container  */}
      </BackgroundImage>
    </div>
  )
}

export default ProjectCreated
