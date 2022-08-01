import React from "react"
import { useRoutes } from "react-router-dom"
import routesConfig from "@/routesConfig"
import Header from "@/components/Header"

function App() {
  return (
    <>
      <Header />
      {useRoutes(routesConfig)}
    </>
  )
}

export default App
