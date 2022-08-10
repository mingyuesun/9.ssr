import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import { matchRoutes } from "react-router-dom"
import proxy from "express-http-proxy" //http://localhost:8000
import StyleContext from "isomorphic-style-loader-react18/StyleContext"
import App from "@/App"
import { getServerStore } from "@/store"
import routesConfig from "@/routesConfig"

const express = require("express")
const app = express()
app.use(express.static("public"))
app.use(
  "/api",
  proxy("http://localhost:8000", {
    proxyReqPathResolver(req) {
      return `/api${req.url}`
    }
  })
)
app.get("*", (req, res) => {
  const routeMatches = matchRoutes(routesConfig, { pathname: req.url })
  if (routeMatches) {
    const { store } = getServerStore(req)
    // 因为本次渲染可能会调用多个数据加载方法，进行多次接口调用，有的可能会成功，有的可能会失败
    // 默认情况下，如果有一个接口调用失败了，则整个应用会加载失败，所以将调用结果不论成功还是失败都变为成功
    const loadDataPromise = routeMatches
      .map(
        (match) =>
          match.route.element.type.loadData &&
          match.route.element.type.loadData(store).then(
            (data) => data,
            (error) => error
          )
      )
      .concat(App.loadData && App.loadData(store))
      .filter(Boolean)
    Promise.all(loadDataPromise).then(() => {
      if (req.url === '/profile' && (!store.getState().auth.user)) {
        return res.redirect('/login')
      } else if (routeMatches[routeMatches.length - 1].route.path === '*') {
        res.statusCode = 404
      }
      const css = new Set()
      const insertCss = (...styles) => styles.forEach(style => {
        css.add(style._getCss())
      })
      const html = renderToString(
        <StaticRouter location={req.url}>
          <StyleContext.Provider value={{insertCss}}>
            <App store={store} />
          </StyleContext.Provider>
        </StaticRouter>
      )
      res.send(`
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>ssr</title>
          <style>${[...css].join('')}</style>
				</head>
				<body>
					<div id="root">${html}</div>
          <script>
            window.context = {state: ${JSON.stringify(store.getState())}}
          </script>
					<script src="/client.js"></script>
				</body>
				</html>
		`)
    })
  } else {
		res.sendStatus(404)
	}
})

app.listen(3000, () => console.log("server started on port 3000"))
