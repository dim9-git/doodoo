import { Suspense } from "react"

import { Title, Container } from "@/shared"

import { Stories } from "@/entities/stories"
import { CatGroupProducts } from "@/entities/product-categories"

import { Filters } from "@/features/filter-products"
import {
  findFilteredProducts,
  type GetSearchParams,
} from "@/features/filter-products/server"
import { CheckoutSuccessToast } from "@/features/checkout"
import { VerifySuccessToast } from "@/features/auth"

import { TopNavbar } from "@/widgets/top-navbar"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>
}) {
  const params = await searchParams
  const categories = await findFilteredProducts(params)

  const nonEmptyCategories = categories.filter((cat) => cat.products.length > 0)

  return (
    <>
      <div>
        <Container className="mt-10">
          <Title text="Все пиццы" size="lg" className="font-extrabold" />
        </Container>

        <TopNavbar />

        <Stories />

        <Container className="mt-10 pb-14">
          <div className="flex gap-[60px] max-xl:flex-col">
            {/* Filters */}
            <div className="xl:max-w-[250px] w-full">
              <Title text="Фильтры" size="sm" className="font-bold" />
              <Suspense>
                <Filters className="flex xl:flex-col lg:justify-between max-lg:flex-wrap max-lg:gap-x-16 max-lg:gap-y-5" />
              </Suspense>
            </div>

            {/* Products */}
            <div className="flex-1 space-y-16">
              {nonEmptyCategories.map((category) => (
                <CatGroupProducts
                  key={category.id}
                  title={category.name}
                  categoryId={category.id}
                  products={category.products}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>

      <CheckoutSuccessToast />
      <VerifySuccessToast />
    </>
  )
}
