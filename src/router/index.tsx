import { FC } from "react"
import { Routes } from "react-router-dom";

import appRoutes from "./const";

import { renderRoute } from "./helper";

const AppRouter: FC = () => {
  return (
    <Routes>
      {
        appRoutes.map(renderRoute)
      }
    </Routes>
  )
}
export default AppRouter 
