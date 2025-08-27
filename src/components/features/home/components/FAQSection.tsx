import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, easeOut, AnimatePresence } from 'framer-motion'
import { faqList } from '@/constants/home'
import { siteMetadata } from '@/constants/metadata'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

const faqContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const faqItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 15,
      stiffness: 100,
      mass: 1,
    },
  },
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <motion.section
      layout
      className="w-full px-10 min-[450px]:px-20 min-[650px]:px-30 py-16 bg-[#1E1C26] text-white flex flex-col min-[1290px]:flex-row justify-center items-center gap-5 xl:gap-20"
    >
      <motion.div
        className="w-full xl:w-2/5 space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div
          className="text-sm text-gray-400 flex items-center gap-2"
          variants={itemVariants}
        >
          <div className="text-white inline-flex border-b-2 pb-2 items-center justify-center xl:justify-start">
            <Image
              src="/icons/home/copy-white-icon.svg"
              alt=""
              width={15}
              height={15}
              className="mx-auto xl:mx-0"
              priority
            />
            <p className="text-xl xl:text-2xl text-white font-medium pl-2">
              Frequently Asked Questions
            </p>
          </div>
        </motion.div>

        {/* FAQ 리스트를 위한 별도 motion.div */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={faqContainerVariants}
        >
          {faqList.map((faq) => (
            <motion.div
              key={faq.id}
              className="rounded-lg overflow-hidden shadow-sm group"
              variants={faqItemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2, ease: easeOut },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className={`w-full flex justify-between items-center px-6 py-4 text-xl font-medium ${faq.bg} text-black text-left transition-colors duration-200`}
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                >
                  <Image
                    src="/icons/home/down-arrow-icon.svg"
                    alt=""
                    width={15}
                    height={15}
                    priority
                  />
                </motion.span>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    style={{ overflow: 'hidden' }}
                    className={`rounded-t-xs rounded-b-lg px-6 ${faq.bg} -translate-y-0.5 group-hover:transform-all group-hover:-translate-y-0.5`}
                  >
                    <motion.div
                      className="pb-4 text-lg text-black"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="flex pt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.div
          className="pr-3 pt-8 min-[830px]:block hidden"
          initial={{ pathLength: 0, opacity: 0, x: -20 }}
          animate={{ pathLength: 1, opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        >
          <motion.img
            src="/icons/home/dashed-arrow-icon.svg"
            alt=""
            width={48}
            height={48}
            className="object-cover"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 1, duration: 3 }}
          />
        </motion.div>
        <div className="w-full xl:w-full flex flex-col items-center xl:items-start text-left gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden mx-auto">
              <Image
                src="/images/home/home-avatar.svg"
                alt=""
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="absolute -top-5 -left-6 w-24 h-24 border-dotted border-2 border-white rounded-full opacity-30 animate-ping" />
          </div>
          <p className="text-lg xl:text-xl text-white max-w-xl">
            If you still have questions or need more details, we&apos;re here to
            help! Reach out to us, and we&apos;ll be happy to assist you on your
            ThinkStorm journey. Whether you&apos;re curious about features, need
            guidance on getting started, or just want to share feedback,
            we&apos;re only a click away.
          </p>
          <Button
            variant="gradient"
            size="gradient"
            textBgWhite
            textClassName="!bg-white !text-black text-sm sm:text-base"
          >
            <Link href={`mailto:${siteMetadata.email}`} target="_blank">
              Contact Us
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.section>
  )
}
