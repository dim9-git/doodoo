import { HttpClient } from "./http-client"

export const Api = new HttpClient(process.env.NEXT_PUBLIC_APP_URL!)
