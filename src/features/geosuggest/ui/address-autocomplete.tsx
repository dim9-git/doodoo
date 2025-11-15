import {
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteProps,
  useDebouncedValue,
} from "@/shared"

import { useAddresses } from "../model/use-addresses"

type Props = Omit<
  AutocompleteProps,
  "options" | "isLoading" | "emptyText" | "loadingText"
>

export default function AddressAutocomplete({
  value = "",
  onChange,
  onClear,
  className,
}: Props) {
  const [q] = useDebouncedValue<string>(value, 300)

  const { addresses, isLoading } = useAddresses({ q })

  const options: AutocompleteItem[] =
    addresses?.map((address) => ({
      value: address.title.text,
      label: address.title.text,
    })) ?? []

  return (
    <AutocompleteInput
      value={value}
      onChange={onChange}
      onClear={onClear}
      options={options}
      isLoading={isLoading && q.length > 2}
      className={className}
      placeholder="Введите адрес"
      emptyText="Адрес не найден"
      loadingText="Загрузка..."
      heading="Адреса"
    />
  )
}
