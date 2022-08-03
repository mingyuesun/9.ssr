# 9.ssr

## 1. 渲染模式

1. 服务器渲染
  - 页面上的内容是由服务器生产的

2. 客户端渲染
	- 页面上的内容由于浏览器运行 JS 脚本而渲染到页面上的
		- 浏览器访问服务器
		- 服务器返回一个空的 HTML 页面，里面有一个资源链接，如 `client.js`
		- 浏览器下载 JS 代码在浏览器中运行
		- 内容呈现在页面上

3. 为什么选择 SSR
	- 首屏等待：在客户端渲染的模式下，所有的数据请求和 DOM 渲染都在浏览器端完成，所以第一次访问页面时，可能会出现白屏；而服务器端渲染会在服务器端进行数据请求和 DOM 渲染，浏览器收到完整的内容后，可以渲染页面。
	- SEO：SPA 对搜素引擎不够友好

## 2. SSR + SAP 同构

- 第一次访问页面是 SSR，后面访问是 SAP，而且支持 SEO
- 客户端和服务器端同构可以实现（尽可能复用代码）
- 工作流程：
	- 服务器端运行 React 代码渲染出 HTML 字符串
	- 服务器把渲染出的 HTML 页面发给浏览器
	- 浏览器接受到 HTML 会渲染到页面上
	- 浏览器发现页面引用 JS 文件（如 `clien.js`）会去下载
	- 浏览器下载得到 JS 文件（如 `clien.js`）并在浏览器端执行
	- 浏览器中的代码接管页面中的所有内容，后面和客户端渲染是一样的

## 3. 客户端路由

1. 流程
  - 客户端请求服务器
	- 服务器返回 HTML 给浏览器，浏览器渲染显示页面
	- 浏览器发现需要外链 JS 资源，加载 JS 资源
	- 加载好的 JS 资源在浏览器端执行
	- JS 中的 React 代码开始实现路由功能
	- 路由代码首先获取地址栏中的地址，然后根据不同的地址和路由配置渲染对应的内容

## 4. 存在的问题

1. 按理说，客户端不能直接访问 API 接口
2. loadData 如何获取和加载数据
3. 为什么 loadData 返回的是 Promise
	- 原始的 sotre.dispatch
		```js
			function dispatch(action) {
				return action
			}
		```
	- thunk（使用了 middleware 之后的 store）
		```js
			const middleware = ({dispatch, getState}) =>
				next => 
				action => {
					if (typeof action === 'function') {
						// 执行函数，并返回函数执行的结果
						return action(dispatch, getState, extraArgument)
					}
					return next(action)
				}
		```