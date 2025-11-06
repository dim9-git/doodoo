"use client"

import { ChangeEvent, useState } from "react"
import { useDebounce } from "react-use"

import { cn } from "@/shared/lib/utils"
import { Button, Input } from "@/shared/ui/sh"
import { Skeleton } from "@/shared/ui/sh/skeleton"

import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox"

type Item = FilterCheckboxProps

interface Props {
  className?: string
  title: string
  groupName?: string
  items: Item[]
  limit?: number
  onCheckedChange?: (id: string) => void
  selectedValues: Set<string>
  searchPlaceholder?: string
  isLoading?: boolean
}

export default function FilterCheckboxGroup({
  className,
  title,
  groupName,
  items,
  limit = 5,
  isLoading = false,
  onCheckedChange,
  selectedValues,
  searchPlaceholder = "Поиск",
}: Props) {
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("")

  useDebounce(
    () => {
      setDebouncedSearchValue(searchValue)
    },
    250,
    [searchValue]
  )

  const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const [displayAll, setDisplayAll] = useState(false)

  if (isLoading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    )
  }

  const list = (displayAll ? items : items.slice(0, limit)).filter((item) =>
    item.label.toLowerCase().includes(debouncedSearchValue.toLocaleLowerCase())
  )

  return (
    <div className={cn(className)}>
      <p className="text-base font-bold">{title}</p>

      {displayAll ? (
        <div className="mt-3">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchValueChange}
            className="bg-gray-100 border-none"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-4 mt-5 max-h-96 overflow-y-auto pr-2 scrollbar">
        {list.map((item, idx) => (
          <FilterCheckbox
            key={`${idx}`}
            groupName={groupName}
            label={item.label}
            value={item.value}
            endContent={item.endContent}
            checked={selectedValues.has(item.value)}
            onCheckedChange={() => onCheckedChange?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit ? (
        <Button
          variant="link"
          className="text-sm"
          onClick={() => setDisplayAll((prev) => !prev)}
        >
          {displayAll ? "Скрыть" : "Показать все"}
        </Button>
      ) : null}
    </div>
  )
}
