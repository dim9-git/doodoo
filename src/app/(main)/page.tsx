import Container from "@/shared/ui/container"
import { Title } from "@/shared/ui/title"

import { getCategories, CatGroupProducts } from "@/entities/product-categories"

import { Filters } from "@/features/filter-products"

import TopNavbar from "@/widgets/top-navbar.tsx/ui/top-navbar"

export default async function Home() {
  const categories = await getCategories()

  const notEmptyCategories = categories.filter(
    (category) => category.products.length > 0
  )

  return (
    <div>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopNavbar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px] max-xl:flex-col">
          {/* Filters */}
          <div className="xl:max-w-[250px] w-full">
            <Title text="Фильтры" size="sm" className="font-bold" />
            <Filters className="max-xl:flex max-xl:justify-between" />
          </div>

          {/* Products */}
          <div className="flex-1 space-y-16">
            {notEmptyCategories.map((category) => (
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
  )
}
