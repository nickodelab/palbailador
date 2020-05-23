
import React, { useEffect } from 'react'
import {
	Avatar,
	Button,
	TextField,
	Link,
	Paper,
	Box,
	Grid,
	Typography,
	FormControlLabel,
	Checkbox,
	withStyles,
} from '@material-ui/core/'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons/'

import videoBackground from '../../img/backgroundLogin.mp4'
import Copyright from '../shared/Copyright'

const styles = (theme) => ({
	root: {
		height: '100vh',
	},
	paper: {
		margin: theme.spacing(8, 4),
		...theme.mixins.flexy('column wrap', 'center', 'center')
	},
	avatar: {
		margin: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
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
	}
})

const BigSidebarLayout = ({ classes, Component }) => {

	useEffect(() => { document.body.className = classes.body }, [classes.body])

	return <Grid container component="main" className={classes.root}>
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square>
			<Component />
		</Grid>
		<Grid item xs={false} sm={4} md={7} >
			<div className={classes.wrapper} dangerouslySetInnerHTML={{
				__html: `
				<video
					loop
					muted
					autoplay
					playsinline
					src="${videoBackground}"
					class="${classes.video}"
				/>,
				`}}>
			</div>
		</Grid>
	</Grid>
}

export default withStyles(styles)(BigSidebarLayout)
