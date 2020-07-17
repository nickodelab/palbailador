import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core/';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons/';
import { connect } from 'react-redux';

import validate from '../../utils/validate';
import { registerUser } from '../../redux/actions/user';
import { setAlert } from '../../redux/actions/ui';
import { NPLink, Copyright, Alert } from '../shared';

const useStyles = makeStyles((theme) => ({
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

const SignUp = ({ registerUser, setAlert, alert }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [nickname, setNickname] = useState('');

  const submitForm = event => {
    try {
      event.preventDefault();
      validate.registerUser({ email, nickname, password, passwordC });
      registerUser({ email, nickname, password });
    } catch ({ message }) {
      setAlert({ message, level: 'error' }, 'registerUser');
    }
  };

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <form className={classes.form} noValidate>
        {alert && <Alert level={alert.level}>{alert.message}</Alert>}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password confirmation"
          type="password"
          autoComplete="current-password"
          onChange={e => setPasswordC(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nickname"
          onChange={e => setNickname(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submitForm}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <NPLink
              routeName="login"
              text="Already have an account? Login"
            />
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
  );
}

const mapStateToProps = ({ ui: { alert } }) => ({ alert });
export default connect(mapStateToProps, { registerUser, setAlert })(SignUp);
