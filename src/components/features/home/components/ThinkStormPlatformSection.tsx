"use client";

import Image from "next/image";
import { motion, easeOut, easeInOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut, delay: 0.2 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const leftVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOut },
  },
};

const rightVariants = {
  hidden: { opacity: 0, rotate: 6, scale: 0.95 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 1.1, ease: easeOut },
  },
};

const floatVariants = {
  animate: {
    y: [0, -40, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

export default function ThinkStormPlatformSection() {
  return (
    <FadeInWhenVisible>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-25 flex flex-col-reverse pt-30 lg:pt-20 lg:flex-row items-center align-items justify-center gap-5 xl:gap-10 px-6 min-h-[80vh] overflow-hidden"
      >
        {/* Left Section */}
<motion.div
  variants={leftVariants}
  className="mb-20 lg:ml-20 lg:mb-0 max-w-xl text-center lg:text-left space-y-6"
>
  <div className="inline-flex border-b-2 pb-2 items-center justify-center">
    <Image
      src="/icons/home/copy-black-icon.svg"
      alt=""
      width={15}
      height={15}
      className="mx-auto lg:mx-0"
      priority
    />
    <motion.p
      variants={textVariants}
      className="text-lg lg:text-xl text-black font-medium pl-2"
    >
      ThinkStorm Platform
    </motion.p>
  </div>

  <motion.h1
    variants={textVariants}
    className="text-2xl lg:text-3xl xl:text-4xl text-black leading-snug"
  >
    ThinkStorm is a unique collaborative platform to connect all tech professionals, learners and innovators!
  </motion.h1>

  <motion.div
    layout
    variants={buttonVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.3, ease: "easeOut" }} 
  >
    <Button variant="outline" size="lg" className="px-6 py-2 transition-all duration-300">
      Get Started
    </Button>
  </motion.div>
</motion.div>


        {/* Right Section */}
<motion.div
  variants={rightVariants}
  className="lg:mb-0 flex justify-center lg:min-w-xl xl:min-w-3xl"
>
  <motion.div
    variants={floatVariants}
    animate="animate"
    className="w-[400px] lg:w-[400px] xl:w-[500px]"
  >
    <Image
      src="/icons/home/cloud1-icon.svg"
      alt=""
      width={600}
      height={600}
      className="w-full h-auto"
      priority
    />
  </motion.div>
</motion.div>
      </motion.section>
    </FadeInWhenVisible>
  );
}