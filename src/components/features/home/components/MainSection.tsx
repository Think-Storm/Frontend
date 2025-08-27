import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useTransform, useSpring } from "framer-motion";
import { MainSectionProps } from "@/constants/home";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function MainSection({ scrollY, ref }: MainSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [boxWidth, setBoxWidth] = useState(0);
  const rightboxRef = useRef<HTMLDivElement>(null);

  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const isXL = useMediaQuery("(min-width: 1280px)");
  const isMD = useMediaQuery("(min-width: 768px)");
  const whiteBgOpacity = useTransform(
    scrollY,
    isXL ? [0, 700, 1000] : isMD ? [0, 900, 1400] : [0, 400, 900],
    [0, 0, 1],
  );

  const springY = useSpring(y, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!rightboxRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setBoxWidth(entry.contentRect.width);
    });

    observer.observe(rightboxRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate z-[50] min-h-[800px] md:min-h-[1400px] xl:min-h-[1200px] flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ opacity: 1 }}>
        <Image
          src="/images/home/home-bg.svg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <Image
          src="/images/home/home-bg-pattern.svg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-white pointer-events-none z-10"
        style={{ opacity: whiteBgOpacity }}
      />

      <motion.div
        className="absolute inset-0 -z-8 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        style={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
          scale: 1.5,
        }}
      />

      <div className="w-full h-screen min-h-[100vh] md:h-full md:min-h-[100vh] max-w-full mx-auto my-auto flex flex-col xl:flex-row items-center justify-between xl:gap-10 px-4 sm:px-8">
        <motion.div
          className="relative flex flex-col justify-center align-items w-full h-screen min-h-[60vh] min-w-md text-center"
          style={{ y: springY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            y: isLoaded ? 0 : 50,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-gray-500 text-lg lg:text-xl xl:text-2xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Always hard to start from scratch?
          </motion.p>

          <div className="text-4xl min-[520px]:text-5xl font-bold leading-tight">
            {"Build a ".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="text-pink-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
            >
              Real-world
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Project&nbsp;
            </motion.span>
            <span className="relative inline-block">
              <motion.span
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.6, type: "spring" }}
              >
                Together
              </motion.span>
              <motion.div
                className="absolute inset-0 -top-1 -left-5 w-[115%] h-[130%] -z-10"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2, duration: 0.8, type: "spring" }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/icons/home/circle1-icon.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                  aria-hidden="true"
                />
              </motion.div>
            </span>
          </div>

          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="gradient" 
                size="gradient"
                className="p-[3px] rounded-[12px] shadow-lg hover:shadow-xl transition-shadow"
                textClassName="!bg-black !text-white px-6 py-2"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-2 flex justify-center xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="gradient"
                size="gradient"
                textBgWhite
                textClassName="w-[170px] !bg-white !text-black text-sm sm:text-base shadow-md"
              >
                Let&apos;s collaborate!
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={rightboxRef}
          className="relative w-full min-w-3xl ml-30 xl:mx-auto xl:h-[780px] -mt-10 xl:mt-0 md:block hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          style={{
            height: "640px",
            x: mousePosition.x * -20,
            y: mousePosition.y * -10,
          }}
        >
          <motion.div
            className="z-30 absolute hidden xl:block xl:top-2"
            style={{
              right: `calc(${boxWidth}px / 2 - 180px)`,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant="gradient" 
              size="gradient"
              textBgWhite
              textClassName="w-[170px] !bg-white !text-black text-sm sm:text-base shadow-lg"
            >
              Let&apos;s collaborate!
            </Button>
          </motion.div>

          <motion.div>
            <Image
              src="/images/home/home-collab.svg"
              alt=""
              fill
              className="object-contain"
              priority
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
