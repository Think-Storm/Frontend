import Image from "next/image";
import { motion } from "framer-motion";
import { cardData } from "@/constants/home";
import JoinUsSection from "@/components/features/home/components/JoinUsSection";
import Card from "@/components/features/home/components/Card";

export default function CardSection() {
  return (
    <section className="relative bg-white pb-10 pt-10 lg:pt-22 px-6 min-h-[200vh] md:min-h-[180px] xl:min-h-[150vh] z-10">
      <motion.div className="absolute inset-0 -z-10">
        <Image
          src="/images/home/home-bg-section4.svg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
      </motion.div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 max-md:mx-10 max-lg:mx-18 lg:grid-cols-2 xl:grid-cols-4 gap-10">
        {cardData.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: [0, -10, 0] }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false, amount: 0.8 }}
          >
            <Card card={card} />
          </motion.div>
        ))}
      </div>

      <JoinUsSection />
    </section>
  );
}
