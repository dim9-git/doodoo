"use client"

import { Input, RangeSlider, cn } from "@/shared"

import { useIngridients } from "@/entities/ingredients"

import FilterCheckboxGroup from "./filter-checkbox-group"
import { PriceRangeKey, useFilters } from "../model/use-filters"
import { useQueryFilters } from "../model/use-query-filters"

interface Props {
  className?: string
}

export default function Filters({ className }: Props) {
  const filters = useFilters()

  useQueryFilters(filters)

  const { ingridients, isLoading } = useIngridients()

  const ingridientItems =
    ingridients?.map((ingr) => ({
      label: ingr.name,
      value: ingr.id.toString(),
    })) ?? []

  const setPrice = (attr: keyof typeof PriceRangeKey, val: string) => {
    filters.setPrices((prevPrices) => ({
      ...prevPrices,
      [attr]: Number(val),
    }))
  }

  return (
    <div className={cn(className)}>
      {/* Categories */}
      <div className="space-y-4 mt-5">
        <FilterCheckboxGroup
          groupName="sizes"
          title="Размеры"
          items={[
            { label: "20 см", value: "20" },
            { label: "30 см", value: "30" },
            { label: "40 см", value: "40" },
          ]}
          onCheckedChange={filters.onToggleSize}
          selectedValues={filters.sizes}
        />

        <FilterCheckboxGroup
          groupName="types"
          title="Тип теста"
          items={[
            { label: "Традиционное", value: "1" },
            { label: "Тонкое", value: "2" },
          ]}
          onCheckedChange={filters.onToggleType}
          selectedValues={filters.types}
        />
      </div>

      {/* Price */}
      <div className="mt-5 border-y border-y-neutral-200 py-5 pb-7 max-xl:min-w-[300px]">
        <p className="text-base font-bold">Цена (от и до)</p>
        <div className="flex items-center gap-3 mt-3">
          <Input
            placeholder="0"
            type="number"
            inputMode="numeric"
            min={0}
            max={1000}
            defaultValue={filters.prices.fromPrice?.toString() ?? ""}
            onChange={(e) => setPrice("fromPrice", e.target.value)}
          />
          <Input
            placeholder="1000"
            type="number"
            inputMode="numeric"
            min={0}
            max={1000}
            defaultValue={filters.prices.toPrice?.toString() ?? ""}
            onChange={(e) => setPrice("toPrice", e.target.value)}
          />
        </div>

        <div className="mt-5">
          <RangeSlider
            min={0}
            max={1000}
            step={1}
            value={[
              filters.prices.fromPrice ?? 0,
              filters.prices.toPrice ?? 1000,
            ]}
            onValueChange={([fromPrice, toPrice]) =>
              filters.setPrices({ fromPrice, toPrice })
            }
          />
        </div>
      </div>

      {/* Ingridients */}
      <div className="mt-5">
        <FilterCheckboxGroup
          groupName="ingridients"
          title="Ингредиенты"
          limit={6}
          items={ingridientItems}
          isLoading={isLoading}
          onCheckedChange={filters.onToggleIngredient}
          selectedValues={filters.ingredients}
        />
      </div>
    </div>
  )
}
