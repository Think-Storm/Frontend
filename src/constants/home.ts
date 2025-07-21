const ICONS = {
    sparkle1: "/icons/sparkle1.png",
    sparkle: "/icons/sparkle.png",
    sparkle2: "/icons/sparkle2.svg",
    union: "/icons/union.svg",
} as const;

export const cardData = [
    {
        title: "Start",
        icon: ICONS.sparkle1,
        text: "Have an amazing idea? You can create any kind of application, from educational purposes to profit-driven goals. Simply share your idea and connect with fellow developers who will join you on that journey.",
        bg: "bg-[#FFF4F2]",
    },
    {
        title: "Explore",
        icon: ICONS.sparkle,
        text: "Don’t have ideas for your future project? No problem! In the Explorer, filter projects by technology, your interests, or your goals to find the ones that suit you best.",
        bg: "bg-[#F1F9F3]",
    },
    {
        title: "Find",
        icon: ICONS.sparkle2,
        text: "Tired of the standard resume and cover letter routine, and the long wait for that 'unfortunately' email in your inbox? This time, get noticed by recruiters who will directly view your developer portfolio.",
        bg: "bg-[#F2F4FF]",
    },
    {
        title: "Participate",
        icon: ICONS.union,
        text: "Each week, we introduce a theme into the Storm. Are you ready to compete against other teams? Build your project based on the given theme and aim for the top prize!",
        bg: "bg-[#FFF1F3]",
    },
];

export const faqList = [
    {
        question: "What is ThinkStorm?",
        answer: "ThinkStorm is a collaborative platform where tech professionals can showcase projects, connect with collaborators, and find opportunities based on portfolios rather than traditional resumes.",
        bg: "bg-[#FFEFF1]",
        id: "faq-1"
    },
    {
        question: "Who can use ThinkStorm?",
        answer: "ThinkStorm is open to tech professionals, freelancers, students, and companies looking to hire or collaborate on innovative projects.",
        bg: "bg-[#E6F7FF]" ,
        id: "faq-2"
    },
    {
        question: "Can I showcase my own projects on ThinkStorm?",
        answer: "Yes! You can create and showcase your projects on ThinkStorm, allowing others to view, engage, and potentially join in on your ideas.",
        bg: "bg-[#E9FFF1]",
        id: "faq-3"
    },
    {
        question: "What types of projects can I find on ThinkStorm?",
        answer: "You'll find projects in fields such as AI, web development, mobile app development, IoT, blockchain, and more.",
        bg: "bg-[#FFEFF8]",
        id: "faq-4"
    },
    {
        question: "How do I join a project on ThinkStorm?",
        answer: "Browse the Project Explorer to find open projects. You can request to join or collaborate on any project that interests you directly from the project page.",
        bg: "bg-[#EAE6FF]",
        id: "faq-5"
    },
    // {
    //     question: "How does ThinkStorm help with recruiting?",
    //     answer: "ThinkStorm enables recruiters to view real-world project portfolios and assess candidates based on their collaborative work and technical expertise, rather than just a resume.",
    //     bg: "bg-[#EAE6FF]",
    //     id: "faq-6"
    // },
];
