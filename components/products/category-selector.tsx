import { cn } from '@/lib/utils'
import type { Category } from '@/types/products'

type CategoryKey = 'pivo' | 'limo' | 'voda'

interface CategorySelectorProps {
  categories: Category[]
  selectedCategory: CategoryKey
  onCategoryChange: (category: CategoryKey) => void
}

export const CategorySelector = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySelectorProps) => {
  return (
    <div className='flex justify-center'>
      <div className='flex bg-zinc-800/50 p-1 backdrop-blur-sm'>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id as CategoryKey)}
            className={cn(
              'px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
              selectedCategory === category.id
                ? 'bg-brand-primary text-brand-action shadow-lg'
                : 'text-brand-primary hover:bg-zinc-700/50'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
