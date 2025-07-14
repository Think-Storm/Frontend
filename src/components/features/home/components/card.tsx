import { Button } from "@/components/ui/button";

export default function Card({
    emoji,
    title,
    description,
    learnmoreLink,
}: {
    emoji: string;
    title: string;
    description: string;
    learnmoreLink: string;
}) {
    return (
        <div className="space-y-2">
            <div className="text-2xl">{emoji}</div>
            <h4 className="text-xl font-semibold">{title}</h4>
            <p className="text-gray-600 leading-[30px]">{description}</p>
            <Button href={learnmoreLink} variant="white" size="lg">
                Learn more <span>&gt;</span>
            </Button>
        </div>
    );
}
