
import React, { useState } from 'react';
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
} from '@material-ui/core/';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons/';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import validate from '../../utils/validate';
import { logInUser } from '../../redux/actions/user';
import { setAlert } from '../../redux/actions/ui';
import { NPLink, Copyright, Alert } from '../shared';

const useMyStyles = makeStyles((theme) => ({
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
}));

const Login = ({ logInUser, alert, setAlert }) => {
	const classes = useMyStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitForm = event => {
		try {
			event.preventDefault();
			validate.loginUser({ email, password });
			logInUser({ email, password });
		} catch ({ message }) {
			setAlert({ message, level: 'error' }, 'logInUser');
		}
	};

	return <>
		<Avatar className={classes.avatar}>
			<LockOutlinedIcon />
		</Avatar>
		<Typography component="h1" variant="h5">
			Login
        </Typography>
		<form className={classes.form} noValidate>
			{alert && <Alert level={alert.level}>{alert.message}</Alert>}
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
				onChange={e => setEmail(e.target.value)}
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
				onChange={e => setPassword(e.target.value)}
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
				onClick={submitForm}
			>
				Login
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
	</>
};

const mapStateToProps = ({ ui: { alert, redirect } }) => ({ alert: alert || redirect.alert });
export default connect(mapStateToProps, { logInUser, setAlert })(withRouter(Login));
