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
