import { Container, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.palette.grey[200],
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  links: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    color: grey[600],
    maxWidth: "300px",
  },
}));
export default function Footer() {
  const date = new Date().getFullYear();
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container className={classes.wrapper}>
        <Typography variant="body1">
          Made by Ihor Shalkauskas © {date}
        </Typography>
        <Container className={classes.links}>
          <Link to="/about" component={RouterLink} color="inherit">
            <u>About</u>
          </Link>
          <Link
            href="https://shalkauskas.com"
            target="_blank"
            rel="noreferrer"
            color="inherit"
          >
            <u>Portfolio</u>
          </Link>
          <Link
            href="https://github.com/shalkauskas"
            target="_blank"
            rel="noreferrer"
            color="inherit"
          >
            <u>GitHub</u>
          </Link>
        </Container>
      </Container>
    </footer>
  );
}
