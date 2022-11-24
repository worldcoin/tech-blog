import {BlogListFilter, BlogListFilterValues} from 'Home/BlogList'
import {memo, useEffect, useState} from 'react'
import {Item} from './Item'

export const Filter = memo(function Filter(props: {
  categories: BlogListFilter['category']
  onChange: (arg: BlogListFilterValues) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState<BlogListFilterValues['category']>(null)

  // dispatch on change filter
  useEffect(() => {
    props.onChange({category: selectedCategory})
  }, [props, selectedCategory])

  return (
    <ul className="space-y-2">
      <Item
        current={selectedCategory === null}
        onClick={setSelectedCategory}
        category={{title: 'All categories', value: null}}
      />

      {props.categories.map((category, index) => (
        <Item
          key={index}
          current={selectedCategory === category.value}
          onClick={setSelectedCategory}
          category={category}
        />
      ))}
    </ul>
  )
})
