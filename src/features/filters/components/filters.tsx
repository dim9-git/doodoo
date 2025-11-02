"use client"

import { useFilters, useQueryFilters } from "../hooks"
import FilterCheckboxGroup from "./filter-checkbox-group"

import { RangeSlider } from "@/shared/components/ui"
import { Title } from "@/shared/components/title"
import { Input } from "@/shared/components/ui"
import useIngridients from "@/entities/ingredients/hooks/use-ingridients"
import { cn } from "@/shared/lib/utils"

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

  return (
    <div className={cn(className)}>
      <Title text="Фильтры" size="sm" className="font-bold" />

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
            { label: "Тонкое", value: "thin" },
            { label: "Традиционное", value: "traditional" },
          ]}
          onCheckedChange={filters.onToggleType}
          selectedValues={filters.types}
        />
      </div>

      {/* Price */}
      <div className="mt-5 border-y border-y-neutral-200 py-5 pb-7">
        <p className="text-base font-bold">Цена (от и до)</p>
        <div className="flex items-center gap-3 mt-3">
          <Input
            placeholder="0"
            type="number"
            inputMode="numeric"
            min={0}
            max={1000}
            defaultValue={filters.prices.fromPrice?.toString() ?? ""}
            onChange={(e) =>
              filters.setPrices({
                ...filters.prices,
                fromPrice: Number(e.target.value),
              })
            }
          />
          <Input
            placeholder="1000"
            type="number"
            inputMode="numeric"
            min={0}
            max={1000}
            defaultValue={filters.prices.toPrice?.toString() ?? ""}
            onChange={(e) =>
              filters.setPrices({
                ...filters.prices,
                toPrice: Number(e.target.value),
              })
            }
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
          onCheckedChange={filters.onToggleIngridient}
          selectedValues={filters.ingridients}
        />
      </div>
    </div>
  )
}
