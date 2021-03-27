import React from "react";
import DataService from "../../services/DataService";
import { useHistory } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import { grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: "0.5rem",
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus, &:hover": {
        width: "20ch",
      },
    },
  },
}));
export default function SearchNew() {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };
  let history = useHistory();
  const findBySearch = (event) => {
    if (event.key === "Enter" || event.type === "click")
      DataService.findBySearch(search)
        .then((response) => {
          console.log(response);
          history.push({
            pathname: "/search",
            search: `?query=${search}`,
            state: { result: response.data.posts },
          });
        })
        .catch((e) => {
          console.log(e);
        });
  };
  const reset = () => {
    setSearch("");
  };
  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={search}
          onChange={onChangeSearch}
          onKeyPress={findBySearch}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          endAdornment={
            search.length > 1 && (
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={reset}
                >
                  <CloseIcon style={{ color: grey[50] }} />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </div>
    </>
  );
}
