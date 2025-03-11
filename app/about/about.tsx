import '../../styles/globals.css';
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="border-2 border-red-800 border-solid w-full h-16 flex justify-center flex-col">
        {/* Navbar section */}
        <header className="w-full p-4 flex justify-between items-center">
          {/* Left side: Logo and Contact Us link */}
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row items-center gap-2 border-2 border-black-700">
              <Image src="/Vector.png" width={16} height={20} alt="Company logo in vector" />
              <Image src="/NavbarLogo.png" width={136} height={20} alt="Company Logo" priority />
            </div>

            <div className="flex flex-row items-center border-2 border-black-700"><a className="ml-6 text-blue-500 hover:underline">Contact Us</a></div>
          </div>

          {/* Right side: Button */}
          <button className="ml-auto px-20 py-8 w-[159px] h-[40px] bg-black text-white text-base border-white rounded-lg hover:bg-gray-800 opacity-90 ">
            Join The Waitlist
          </button>
        </header>
      </div>
      {/* Main content */}
      <div className="border-2 border-green-700 flex flex-col justify-center items-center h-[900px] gap-8 bg-gradient-to-r from-red-300 via-pink-400 via-purple-400 to-indigo-900">
        <div className="flex flex-col justify-center items-center gap-6">
          <h1 className="text-white uppercase font-bold text-5xl">Let's start your developer journey.</h1>
          <h2 className="text-white">The leading collaboration platform to grow your career and shape your future.</h2>
        </div>
        <div>
          <button className="ml-auto px-20 py-8 w-[167px] h-[48px] bg-black text-white text-base border-white rounded-lg hover:bg-gray-800 opacity-90 ">Join The Waitlist</button>
        </div>

      </div>

      {/* About content */}
      <div className="flex flex-row py-28 px-16 border-2 border-blue-600 gap-20">

        {/* Text flex box */}
        <div className="flex flex-col gap-8 border-5 border-red-700 p-4 flex-1">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-base">About</h3>
            <h1 className="font-bold text-5xl leading-tight">Create inspiring projects for education, open-source initiatives or profit-driven purposes.</h1>
            <p>ThinkStorm is the premier platform for creating projects with millions of developers worldwide, learning new programming languages and innovating to inspire by building the world of tomorrow.</p>
          </div>
          <ul className="">
            <li className="relative pl-5 before:absolute before:left-0 before:content-['→'] before:text-black">
              Explore and discover project ideas from around the world.
            </li>
            <li>
              Create your own project and collaborate with others.
            </li>
            <li>
              Build your own developer portfolio and advance your career.
            </li>
          </ul>
          <button className="w-[135px] h-[48px] border-2 border-gray-500 rounded-lg hover:bg-gray-800 opacity-90">Learn more</button>
        </div>
        {/* Image flex box */}
        <div className="border-5 border-green-700">
          <Image src="/ProjectIllustration.png" width={616} height={640} alt="Company project illustration" />
        </div>
      </div>

      {/* Services content */}
      <div className="flex border-2 border-yellow-800">
        <div className="flex flex-col gap-20 ">
          
        </div>

      </div>
    </div>
  )
}