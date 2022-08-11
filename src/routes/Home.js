import React from 'react'
// import useStyles from "isomorphic-style-loader-react18/useStyles"
import withStyles from "isomorphic-style-loader-react18/withStyles"
import { Helmet } from 'react-helmet'
import styles from './Home.css'

function Home() {
	// useStyles(styles)
	return (
		<>
			<Helmet>
				<title>首页标题</title>
				<meta name="description" content="首页描述"></meta>
			</Helmet>
			<div className={styles.theme}>Home</div>
		</>
	)
}

export default withStyles(styles)(Home)
