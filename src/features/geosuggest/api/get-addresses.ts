import { APP_URL, Api } from "@/shared"

import { GeoResponseDTO } from "./dto/response"

export async function getAddresses(q: string, limit?: number) {
  const url = new URL("/api/geosuggest", APP_URL)
  url.searchParams.set("q", q)
  url.searchParams.set("type", "address")
  if (limit) {
    url.searchParams.set("limit", limit.toString())
  }

  const res = await Api.get<GeoResponseDTO>(url.toString())

  return res.data.data.results
}
