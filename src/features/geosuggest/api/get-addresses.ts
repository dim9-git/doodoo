import { http } from "@/shared"

import { GeoResponseDTO } from "./dto/response"

export async function getAddresses(q: string, limit?: number) {
  const url = new URL("/api/geosuggest", process.env.NEXT_PUBLIC_APP_URL)
  url.searchParams.set("q", q)
  url.searchParams.set("type", "address")
  if (limit) {
    url.searchParams.set("limit", limit.toString())
  }

  const res = await http.get<GeoResponseDTO>(url.toString())

  return res.data.results
}
