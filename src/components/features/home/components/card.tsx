import Image from "next/image";
// import { Button } from "@/components/ui/button";

export default function Card({
  icon,
  title,
  description,
}: //   learnmoreLink,
{
  icon: string;
  title: string;
  description: string;
  //   learnmoreLink: string;
}) {
  return (
    <div className="space-y-2 flex flex-col gap-2">
      <Image src={icon} alt="" width={24} height={24} className="w-7 h-7" />
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-gray-600 text-md">{description}</p>
      {/* <Button href={learnmoreLink} variant="secondary" size="lg">
                Learn more <span>&gt;</span>
            </Button> */}
    </div>
  );
}
