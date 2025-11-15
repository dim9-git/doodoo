import { FormInput, FormPhoneInput, WhiteBlock } from "@/shared"

interface Props {
  className?: string
}

export default function CheckoutPersonalFields({ className }: Props) {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />

        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormPhoneInput name="phone" required />
      </div>
    </WhiteBlock>
  )
}
