import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function JoinUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (!isInView) {
      controls.stop();
      return;
    }

    controls.start({
      y: [0, -20, 0, 20, 0],
      x: [0, 10, -10, 10, 0],
      rotate: [0, 3, -3, 3, 0],
      opacity: [1, 0.85, 1, 0.9, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop",
      },
    });
  }, [isInView, controls]);

  return (
    <div ref={ref} className="relative w-full py-24 px-6 md:px-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col xl:flex-row z-20 max-w-5xl mx-auto bg-[#1f1c2e] text-white rounded-3xl px-10 py-12 pt-40 shadow-lg"
      >
        <motion.div
          animate={controls}
          initial={{ opacity: 0, y: -30 }}
          className="absolute -top-[10vh] left-[3vw] z-10"
        >
          <Image
            src="/icons/home/cloud2-icon.svg"
            alt=""
            width={200}
            height={200}
          />
        </motion.div>

        <div className="flex flex-row gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col max-w-lg"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Who can join ThinkStorm?</h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              ThinkStorm is open to all tech professionals, freelancers, developers, designers,
              PMs, and learners eager to collaborate and innovate together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute max-[380px]:hidden min-[570px]:bottom-35 min-[570px]:right-55 max-[570px]:bottom-15 max-[570px]:left-10 items-center z-20"
          >
            <Button
              variant="gradient" 
              size="gradient"
              textBgWhite
              textClassName="w-[220px] h-[35px] !bg-white !text-black text-sm sm:text-base"
            >
              We&apos;re waiting for you!
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-8 max-[570px]:right-3 min-[570px]:right-7 items-center gap-4 z-10 hidden min-[570px]:block"
          >
            <Button className="px-10 py-2 text-lg" variant="pink" size="lg">
              Join!
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute mt-8 items-center gap-4 flex-wrap min-[570px]:right-25 -bottom-4 max-[570px]:left-10 z-20 hidden min-[570px]:block"
          >
            <Image
              src="/images/home/home-avatars.svg"
              alt=""
              width={350}
              height={350}
              className="object-contain"
              priority
              aria-hidden="true"
            />
          </motion.div>
        </div>

        <div className="flex h-[80px] min-[570px]:h-[200px] w-full xl:w-[60%] xl:h-full min-x-[60%]"></div>
      </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
  className="flex justify-center items-center mt-16 text-center text-2xl md:text-3xl font-medium leading-loose"
>
  <motion.span
    className="text-black relative inline-block"
    animate={{
      y: [0, -10, 5, -5, 0],
      rotate: [0, 3, -2, 2, 0],
    }}
    transition={{
      repeat: Infinity,
      repeatDelay: 2,  
      duration: 4,
      ease: "easeInOut",
      repeatType: "loop",
    }}
  >
    Explore inspiring projects for
    <br />
    education, open-source initiatives, and <motion.span
  className="relative inline-block"
>
  business
  <motion.div
    initial={{ opacity: 0, rotate: -30, x: 0, y: 0 }}
    animate={isInView ? {
      opacity: [0, 1, 0.8, 1],
      rotate: [ -30, 0, 30, 0, -30 ],
      x: [0, 5, 10, 5, 0],
      y: [0, -5, 0, 5, 0],
      scale: [1, 1.2, 1.4, 1.2, 1]
    } : {}}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0,
    }}
    className="absolute -bottom-4 -right-8 ml-1"
  >
    <Image
      src="/icons/home/sparkle4-icon.svg"
      alt=""
      width={30}
      height={30}
      className="object-contain"
      priority
      aria-hidden="true"
    />
  </motion.div>
</motion.span>
  </motion.span>
</motion.div>
    </div>
  );
}