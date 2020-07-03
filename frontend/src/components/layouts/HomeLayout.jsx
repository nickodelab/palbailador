
import React, { useEffect } from 'react'
import {
	Paper,
	Grid,
	withStyles,
} from '@material-ui/core/'

const styles = (theme) => ({
	root: {
		height: '100vh',
	},
	body: {
		overflowY: 'hidden',
		overflowX: 'hidden'
	},
})

const HomeLayout = ({ classes, Component }) => {

	useEffect(() => { document.body.className = classes.body }, [classes.body])

	return <Grid container component="main" className={classes.root}>
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square>
			<Component />
		</Grid>
		<Grid item xs={false} sm={4} md={7} >
		</Grid>
	</Grid>
}

export default withStyles(styles)(HomeLayout)
