
import React, { useEffect } from 'react'
import {
	Avatar,
	Button,
	TextField,
	Box,
	Grid,
	Typography,
	FormControlLabel,
	Checkbox,
	makeStyles
} from '@material-ui/core/'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons/'

import { NPLink } from '../shared'
import Copyright from '../shared/Copyright'
import routing from '../../utils/routing'

const useStyles = makeStyles((theme) => ({
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
	}
}))

const Login = () => {
	const classes = useStyles()

	return <div className={classes.paper}>
		<Avatar className={classes.avatar}>
			<LockOutlinedIcon />
		</Avatar>
		<Typography component="h1" variant="h5">
			Login
        </Typography>
		<form className={classes.form} noValidate>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
			/>
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			>
				Sign In
            </Button>
			<Grid container>
				<Grid item xs>
				</Grid>
				<Grid item>
					<NPLink
						routeName="register"
						text="Don't have an account? Sign Up"
					/>
				</Grid>
			</Grid>
			<Box mt={5}>
				<Copyright />
			</Box>
		</form>
	</div>
}

export default Login
