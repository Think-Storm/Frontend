import {
  Target,
  GraduationCap,
  Heart,
  DollarSign,
  Gamepad,
  Blocks,
  BookCheck,
  Crosshair,
  ScrollText,
} from 'lucide-react'

export const BASE_URL = 'https://thinkstorm.app'

export const BASE_API_URL = 'http://localhost:3001'

export const TITLE = 'ThinkStorm'

export const DESCRIPTION =
  'ThinkStorm is a unique collaborative platform to connect all tech professionals, learners and innovators.'

export const KEYWORDS = [
  'ThinkStorm',
  'Tech Professionals',
  'Developers',
  'Designers',
  'PMs',
  'IT Students',
  'Innovators',
  'Collaborative Platform',
  'Tech Projects',
  'Developer Portfolio',
  'IT Portfolio',
  'Learning Tech',
  'Tech Stacks',
  'Student Projects',
]

export const AUTHOR = 'ThinkStorm'

export const OG_IMAGE = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
  alt: 'ThinkStorm',
}

export const FILTERS = [
  {
    placeholder: 'Skills',
    icon: Blocks,
    options: [
      { label: 'ReactJS', value: 'react' },
      { label: 'NextJS', value: 'next' },
      { label: 'TailwindCSS', value: 'tailwind' },
    ],
  },
  {
    placeholder: 'Field',
    icon: BookCheck,
    options: [
      { label: 'AI', value: 'ai' },
      { label: 'Software Development', value: 'software' },
      { label: 'iOS', value: 'ios' },
    ],
  },
  {
    placeholder: 'Purpose',
    icon: Crosshair,
    options: [
      { label: 'Self-development', value: 'self' },
      { label: 'Hobby', value: 'hobby' },
      { label: 'Portfolio', value: 'portfolio' },
    ],
  },
  {
    placeholder: 'Language',
    icon: ScrollText,
    options: [
      { label: 'Python', value: 'python' },
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
    ],
  },
  {
    placeholder: 'Recent',
    options: [
      { label: 'Recent', value: 'recent' },
      { label: 'Popular', value: 'popular' },
    ],
  },
]

export const goalIcons = {
  Profitable: DollarSign,
  Education: GraduationCap,
  Fun: Gamepad,
  OpenSource: Heart,
  Other: Target,
}

export type GoalType = keyof typeof goalIcons
