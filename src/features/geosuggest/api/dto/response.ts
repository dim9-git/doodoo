export interface GeoResultItemDTO {
  title: {
    text: string
    hl: { begin: number; end: number }[]
  }
  subtitle: {
    text: string
  }
  tags: string[]
  distance: {
    value: number
    text: string
  }
}

export interface GeoResponseDTO {
  data: {
    results: GeoResultItemDTO[]
  }
}
