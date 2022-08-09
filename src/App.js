import React from "react"
import { useRoutes } from "react-router-dom"
import routesConfig from "@/routesConfig"
import Header from "@/components/Header"
import { Provider } from 'react-redux'
import { validate } from '@/store/actionCreators/auth'

function App({store}) {
  return (
    <Provider store={store}>
      <Header />
      {useRoutes(routesConfig)}
    </Provider>
  )
}

App.loadData = (store) => {
  return store.dispatch(validate())
}

export default App
