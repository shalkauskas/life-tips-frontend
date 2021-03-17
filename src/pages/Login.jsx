import AuthService from "../services/AuthService";
import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Login(props) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  const initialUserData = {
    username: "",
    password: "",
  };
  const [userdata, setUserData] = React.useState(initialUserData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userdata, [name]: value });
  };
  const loginUser = () => {
    var data = {
      username: userdata.username,
      password: userdata.password,
    };
    AuthService.login(data)
      .then((response) => {
        response.data.isAuthenticated
          ? onLogin()
          : props.history.push("/login");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const loginGoogle = () => {
    AuthService.loginGoogle().then((response) => {
      console.log(response);
    });
  };
  const onLogin = () => {
    props.history.push("/");
    props.history.go(0);
  };
  return (
    // <div className="" style={{ maxWidth: "600px" }}>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            value={userdata.username}
            onChange={handleInputChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={userdata.password}
            onChange={handleInputChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginUser}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="text-center mt-3">
        <a
          href={`${process.env.REACT_APP_SERVER}/auth/google`}
          onClick={loginGoogle}
        >
          <img src="google-login.svg" alt="google login" width="300px" />
        </a>
      </div>
      {/* </div> */}
    </Container>
  );
}
