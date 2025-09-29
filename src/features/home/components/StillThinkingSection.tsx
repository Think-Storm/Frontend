import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function StillThinkingSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative px-6 pt-20 bg-white flex flex-col gap-1 items-center justify-center min-h-[100vh] z-20"
    >
      <motion.div className="absolute inset-0 -z-10">
        <Image
          src="/images/home/home-bg-pattern.svg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        max-w-[100vw]  max-h-[100vh] w-[150vw] h-[150vh] min-[620px]:w-[140vw] min-[620px]:w-[140vh] min-[860px]:w-[150vw] min-[860px]:h-[150vh] xl:max-w-[79vw] xl:max-h-[150vh]"
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/images/home/home-bg-big-ecllipse.png"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>

      <div className="flex flex-col justify-center w-full max-w-md lg:max-w-[400px] space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-3"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Still Thinking?
          </h3>
          <Image
            src="/icons/home/sparkle2-icon.svg"
            alt=""
            width={24}
            height={20}
            priority
            className="mx-0"
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800"
        >
          Join ThinkStorm adventure and start building&nbsp;
          <span className="text-pink-600 font-semibold">
            projects that make sense
          </span>
          &nbsp;
          <span className="relative inline-block min-w-[6rem]">
            <span className="relative z-10">right away</span>
            <div className="absolute inset-0 w-[120%] h-[120%] -z-10 -top-1 -left-3">
              <Image
                src="/icons/home/circle2-icon.svg"
                alt=""
                fill
                className="object-contain"
                priority
                aria-hidden="true"
              />
            </div>
          </span>
          &nbsp; with developers
          <br className="hidden sm:block" />
          around the world!
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button variant="gradientBorderLight" size="lg">
            Get Started
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
