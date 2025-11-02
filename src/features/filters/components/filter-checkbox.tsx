import React from "react"

import { Checkbox } from "@/shared/components/ui"

export interface FilterCheckboxProps {
  label: string
  value: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  endContent?: React.ReactNode
  groupName?: string
}

export function FilterCheckbox({
  label,
  checked,
  onCheckedChange,
  value,
  endContent,
  groupName,
}: FilterCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className="rounded-[8px] size-6"
        checked={checked}
        onCheckedChange={onCheckedChange}
        value={value}
        id={`filter-checkbox-${groupName}-${value}`}
      />
      <label
        htmlFor={`filter-checkbox-${groupName}-${value}`}
        className="flex-1 cursor-pointer leading-none"
      >
        {label}
      </label>
      {endContent}
    </div>
  )
}
