import { Container, Title } from "@/shared"

import { CheckoutForm } from "@/features/checkout"

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <CheckoutForm />
    </Container>
  )
}
