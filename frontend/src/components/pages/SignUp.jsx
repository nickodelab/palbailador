
import React from 'react'
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
import { registerUser } from '../../redux/actions/user'
import Alert from '../shared/Alert'

const styles = (theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
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

const SignUp = ({ classes, registerUser, error, response }) => {

  const handleRegister = (event) => {
	  event.preventDefault()
      const nickname = event.target.nickname.value
      const email = event.target.email.value
	  const password = event.target.password.value
	  registerUser({ nickname, email, password })
  }

  return <>
    <MobileMenu />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
		<form 
			onSubmit={handleRegister} 
			className={classes.form} 
			noValidate
		>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="nickname"
                variant="outlined"
                required
                fullWidth
                label="Nickname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="#" variant="body2">
                ¿Ya tienes una cuenta? Identifícate
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
  	
	  {!error && response && <Box mt={5}>
      							<p>Te has registrado correctamente. <Link to="/login">Logearte</Link></p>
      						 </Box>}

	  {error && <Alert level='error' message={error} />}
    </Container>
  </>
}


const mapStateToProps = ({ error, response }) => ({ error, response })
export default withStyles(styles)(connect(mapStateToProps, { registerUser })(withRouter(SignUp)))