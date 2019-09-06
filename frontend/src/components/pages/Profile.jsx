
import React, { useState, useEffect } from 'react'
import { 
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
	Box
} from '@material-ui/core/'

import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import MobileMenu from '../layouts/MobileMenu'
import VideoList from '../layouts/VideoList'

import { 
	fillUserVideos
 } from '../../redux/actions/user'

import Alert from '../shared/Alert'
import BottomIcons from '../layouts/BottomIcons'

const styles = (theme) => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	profile: {
		marginTop: theme.spacing(8)
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
})

const Profile = ({ classes, fillUserVideos, videos, error, response }) => {
	
	useEffect(() => { fillReduxState() }, [])

	const fillReduxState = async () => {
		await fillUserVideos()
		// setVideos(videos)
	}

	console.log('videos', videos)

	return <>
		<MobileMenu />
		<Container className={classes.layout} component="main" maxWidth="xs">
			<CssBaseline />
			{ videos && <section className={classes.profile}><VideoList videos={videos}/></section>}
		</Container>
		<BottomIcons />
	</>
}


const mapStateToProps = ({ loggedInUser: { videos } }) => ({ videos })
// export default withStyles(styles)(connect(mapStateToProps, { logInUser })(withRouter(Login)))
export default withStyles(styles)(connect(mapStateToProps, { fillUserVideos })(withRouter(Profile)))