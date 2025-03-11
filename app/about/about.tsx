import '../../styles/globals.css';
import Image from "next/image"

export default function AboutPage() {
  return (
    <div>
      <div className="border-2 border-red-800 border-solid w-full h-16 flex justify-center flex-col">
        {/* Navbar section */}
        <header className="w-full p-4 flex justify-between items-center">
          {/* Left side: Logo and Contact Us link */}
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row items-center gap-2">
              <Image src="/Vector.png" width={16} height={20} alt="Company logo in vector" />
              <Image src="/NavbarLogo.png" width={136} height={20} alt="Company Logo" priority />
            </div>

            <div className="flex flex-row items-center"><a className="ml-6 text-blue-500 hover:underline">Contact Us</a></div>
          </div>

          {/* Right side: Button */}
          <button className="ml-auto px-20 py-8 bg-black text-white text-base border-none rounded hover:bg-gray-800 opacity-90">
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
          <button className="ml-auto px-20 py-8 bg-black text-white text-base border-none rounded hover:bg-gray-800 opacity-90">Join The Waitlist</button>
        </div>

      </div>
    </div>
  )
}