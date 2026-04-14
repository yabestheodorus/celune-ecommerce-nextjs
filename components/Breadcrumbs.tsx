import Link from 'next/link'
import React from 'react'
import { PiCaretRight } from 'react-icons/pi'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-y-2">
        {items.map((item: BreadcrumbItem, index: number) => {
          const isLast = index === items.length - 1
          
          // Decode URL slugs to readable text
          const formattedLabel = item.label.replace(/-/g, ' ').replace(/%20/g, ' ')
          
          const textClassNames = "font-inter text-xs uppercase tracking-widest transition-colors duration-300"

          return (
            <li key={index} className="flex items-center">
              {item.href ? (
                <Link 
                  href={item.href} 
                  className={`${textClassNames} text-brand-burnt/50 hover:text-brand-terracotta hover:underline underline-offset-4`}
                >
                  {formattedLabel}
                </Link>
              ) : (
                <span className={`${textClassNames} text-brand-burnt font-medium`}>
                  {formattedLabel}
                </span>
              )}
              {!isLast && (
                <PiCaretRight size={12} className="text-brand-burnt/30 mx-2 flex-shrink-0" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
