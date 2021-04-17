import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Search from "./Search";
import { grey } from "@material-ui/core/colors";
import HeaderBrand from "./Brand";
import UserMenu from "./UserMenu";
import { GlobalContext } from "../../App";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: grey[50],
    "&:hover": {
      color: grey[500],
    },
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [state] = React.useContext(GlobalContext);
  const [focus, setFocus] = React.useState(false);
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <HeaderBrand focus={focus} />
          <Search setFocus={setFocus} />
          {state.User.isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button className={classes.button} to="/login" component={Link}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
