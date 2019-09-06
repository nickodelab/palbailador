
import React, { useState, useEffect } from 'react'
import { 
	CssBaseline,
	Typography,
	Container,
} from '@material-ui/core/'

import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import MobileMenu from '../layouts/MobileMenu'
import { fillUserVideos } from '../../redux/actions/user'
import BottomIcons from '../layouts/BottomIcons'

const styles = (theme) => ({
	thanks: {
		margin: theme.spacing(20),
	}
})

const Thanks = ({ classes, fillUserVideos, videos, error, response }) => {

	console.log('videos', videos)

	return <>
		<MobileMenu />
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Typography className={classes.thanks} variant="h4" gutterBottom>
        		Video Subido!
      		</Typography>
		</Container>
		<BottomIcons />
	</>
}


const mapStateToProps = ({ loggedInUser: { videos } }) => ({ videos })
// export default withStyles(styles)(connect(mapStateToProps, { logInUser })(withRouter(Login)))
export default withStyles(styles)(connect(mapStateToProps, { fillUserVideos })(withRouter(Thanks)))