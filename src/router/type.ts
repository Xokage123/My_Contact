import { FC } from "react"

export interface Route {
  path: string
  Element: FC
  routes?: Route[]
}