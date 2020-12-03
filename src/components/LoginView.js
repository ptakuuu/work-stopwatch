import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Mikowhy Owl
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function LoginView(props) {
  const classes = useStyles();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function logIn(e) {
    e.preventDefault();
    props.authenticate(email, password);
  }

  return (
    <Container component="main" fixed>
      <Grid container justify="center">
        <Grid item md={6}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={logIn}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <Grid container justify="center">
                <Grid item md={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(LoginView);
