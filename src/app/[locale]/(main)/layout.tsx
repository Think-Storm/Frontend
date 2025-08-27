'use client'

import FilterProvider from '@/components/features/filters/FilterContext'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FilterProvider>
      <div>{children}</div>
    </FilterProvider>
  )
}
