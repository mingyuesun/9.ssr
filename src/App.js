import React from "react"
import { useRoutes } from "react-router-dom"
import routesConfig from "@/routesConfig"
import Header from "@/components/Header"
import { Provider } from 'react-redux'
import { validate } from '@/store/actionCreators/auth'
import useStyles from "isomorphic-style-loader-react18/useStyles"
import styles from './App.css'

function App({store}) {
  useStyles(styles)
  return (
    <Provider store={store}>
      <Header />
      {useRoutes(routesConfig)}
      <footer className={styles.theme}>footer</footer>
    </Provider>
  )
}

App.loadData = (store) => {
  return store.dispatch(validate())
}

export default App
