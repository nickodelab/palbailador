import React, { useEffect } from 'react';
import { Paper, Grid, withStyles } from '@material-ui/core/';
import { connect } from 'react-redux';

import backgrounds from '../../img/backgrounds';

const styles = theme => ({
	leftSidebar: {
		margin: theme.spacing(8, 4),
		...theme.mixins.flexy('column wrap', 'center', 'center'),
		height: '100vh'
	},
});

const MainLayout = ({ classes, Component }) => {

	console.log('<MainLayout />...');
	return <>
		<Grid container component="main" className={classes.root}>
			<Grid item xs={4} component={Paper} elevation={24} square>
				<div className={classes.leftSidebar}>

				</div>
			</Grid>
			<Grid item xs={8}>
				<Component />
			</Grid>
		</Grid>
	</>
};

export default withStyles(styles)(MainLayout);
