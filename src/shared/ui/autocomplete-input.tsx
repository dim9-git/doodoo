"use client"

import { useState } from "react"

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./sh/command"
import { cn } from "../lib/utils"
import ClearButton from "./clear-button"

export interface AutocompleteItem {
  value: string
  label: string
}

export interface AutocompleteProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "required"
  > {
  value?: string
  onClear: () => void
  onChange: (value: string) => void
  options: AutocompleteItem[]
  isLoading: boolean
  emptyText: string
  loadingText: string
  heading?: string
}

export function AutocompleteInput({
  value = "",
  onChange,
  onClear,
  options = [],
  isLoading,
  className,
  placeholder,
  emptyText = "Ничего не найдено",
  loadingText = "Загрузка...",
  heading,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false)

  const DELAY = 300

  return (
    <Command className={cn("rounded-md border", className)}>
      <div className="relative">
        <CommandInput
          value={value}
          placeholder={placeholder}
          onValueChange={(value) => {
            onChange(value)
            setOpen(true)
          }}
          className="h-12"
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), DELAY)}
        />
        {value && onClear && <ClearButton onClick={onClear} />}
      </div>
      {open ? (
        <CommandList>
          <CommandEmpty>{isLoading ? loadingText : emptyText}</CommandEmpty>
          {options && options.length > 0 && (
            <CommandGroup heading={heading}>
              {options.map((option, id) => (
                <CommandItem
                  key={`${id}_${option.value.slice(0, 7)}`}
                  value={option.value}
                  className="cursor-pointer"
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      ) : null}
    </Command>
  )
}
