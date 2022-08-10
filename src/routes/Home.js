import React from 'react'
// import useStyles from "isomorphic-style-loader-react18/useStyles"
import withStyles from "isomorphic-style-loader-react18/withStyles"
import styles from './Home.css'

function Home() {
	// useStyles(styles)
	return (
		<div className={styles.theme}>Home</div>
	)
}

export default withStyles(styles)(Home)
