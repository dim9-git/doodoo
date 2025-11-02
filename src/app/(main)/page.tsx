import Container from "@/shared/components/container"
import { Title } from "@/shared/components/title"
import TopNavbar from "@/shared/components/top-navbar"

import { getCategories } from "@/entities/product-categories"

import Filters from "@/features/filters/components/filters"
import GroupProducts from "@/features/products/components/group-products"

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
        <div className="flex gap-[60px]">
          {/* Filters */}
          <div className="max-w-[250px] w-full">
            <Filters />
          </div>

          {/* Products */}
          <div className="flex-1 space-y-16">
            {notEmptyCategories.map((category) => (
              <GroupProducts
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
