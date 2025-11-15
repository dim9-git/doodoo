"use client"

import { FormTextarea, WhiteBlock } from "@/shared"

import CheckoutAddressInput from "./checkout-address-input"

interface Props {
  className?: string
}

export default function CheckoutAddressFields({ className }: Props) {
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <CheckoutAddressInput name="address" required />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={4}
        />
      </div>
    </WhiteBlock>
  )
}
