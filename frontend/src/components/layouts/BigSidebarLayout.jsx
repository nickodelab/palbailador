import React, { useEffect } from 'react';
import { Paper, Grid, withStyles } from '@material-ui/core/';

import backgrounds from '../../img/backgrounds';

const styles = theme => ({
	paper: {
		margin: theme.spacing(8, 4),
		...theme.mixins.flexy('column wrap', 'center', 'center')
	},
	root: {
		height: '100vh',
	},
	wrapper: {
		overflow: 'hidden'
	},
	video: {
		height: '100%',
		width: '177.77777778vh',
		minWidth: '100%',
	},
	body: {
		overflowY: 'hidden',
		overflowX: 'hidden'
	},
});

const BigSidebarLayout = ({ classes, Component }) => {

	useEffect(() => {
		document.body.className = classes.body
	}, []);

	console.log('<BigSidebarLayout />...');
	return <>
		<Grid container component="main" className={classes.root}>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square>
				<div className={classes.paper}>
					<Component />
				</div>
			</Grid>
			<Grid item xs={false} sm={4} md={7} >
				<div className={classes.wrapper} dangerouslySetInnerHTML={{
					__html: `
					<video
						loop
						muted
						autoplay
						playsinline
						src="${backgrounds[Math.floor(Math.random() * backgrounds.length)]}"
						class="${classes.video}"
					/>,
				`}}>
				</div>
			</Grid>
		</Grid>
	</>
};

export default withStyles(styles)(BigSidebarLayout);
