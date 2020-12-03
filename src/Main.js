<<<<<<< HEAD
import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import routes from "./routes";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import {
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LoginView from "./components/LoginView";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
  },
  mainContainer: {
    padding: theme.spacing(2),
  },
}));

function Main(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = () => {
    firebase.auth().onAuthStateChanged((userObject) => {
      if (userObject) {
        setUser(userObject);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  };

  useEffect(() => {
    authenticate();
  }, []);

  async function signIn(email, password) {
    if (email && password) {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsAuthenticated(true);
      props.history.replace("/home");
    } else {
      console.log("Missing fields");
    }
  }

  async function logout() {
    await firebase.auth().signOut();
    setIsAuthenticated(false);
  }

  return (
    <>
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route
              path="/login"
              exact
              component={() => <LoginView authenticate={signIn} />}
            />
            <Redirect to="/login" />
          </>
        ) : (
          routes.map((route, id) => (
            <Fragment key={id}>
              <AppBar position="static">
                <Toolbar>
                  {/* <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton> */}
                  <Typography variant="h6">🦉</Typography>
                  <Typography variant="h6" className={classes.title}>
                    Hours
                  </Typography>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
              <div className={classes.mainContainer}>
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={route.component}
                />
                <Redirect to={route.path} />
              </div>
            </Fragment>
          ))
        )}
      </Switch>
    </>
  );
}
export default withRouter(Main);
=======
import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import routes from "./routes";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import {
  CircularProgress,
  Snackbar,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import LoginView from "./components/LoginView";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
  },
  mainContainer: {
    padding: theme.spacing(2),
  },
}));

function Main(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function authenticate() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <>
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route
              path='/login'
              exact
              component={() => <LoginView authenticate={authenticate} />}
            />
            <Redirect to='/login' />
          </>
        ) : (
          routes.map((route, id) => (
            <Fragment key={id}>
              <AppBar position='static'>
                <Toolbar>
                  {/* <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton> */}
                  <Typography variant='h6'>🦉</Typography>
                  <Typography variant='h6' className={classes.title}>
                    Projects
                  </Typography>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
              <div className={classes.mainContainer}>
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={route.component}
                />
              </div>
            </Fragment>
          ))
        )}
      </Switch>
    </>
  );
}
export default withRouter(Main);
>>>>>>> 0cdb158daa8daf2fb6a50d855b475677d2f36ec6
