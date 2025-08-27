import Image from "next/image";

type cardType = {
  id: string;
  title: string;
  icon: string;
  text: string;
  bg: string;
};

export default function Card({ card }: { card: cardType }) {
  return (
    <div
      className={`${card.bg} rounded-xl p-6 shadow-md flex flex-col gap-8 h-full pt-25 hover:animate-purpleGlow hover:cursor-pointer`}
    >
      <Image
        src={card.icon}
        alt=""
        width={30}
        height={30}
        className="object-contain"
        priority
        aria-hidden="true"
      />
      <h3 className="text-3xl font-semibold">{card.title}</h3>
      <p className="text-md text-gray-700 leading-relaxed">{card.text}</p>
    </div>
  );
}
