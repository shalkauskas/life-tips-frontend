import Typography from "@material-ui/core/Typography";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    flexShrink: 0,
    marginRight: "0.5rem",
    color: grey[50],
    "&:hover": {
      color: grey[300],
      textDecoration: "none",
    },
  },
}));
export default function HeaderBrand() {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h6"
        className={classes.title}
        to="/"
        component={Link}
      >
        <InsertEmoticonIcon
          style={{ marginRight: "0.5rem", fontSize: "2rem" }}
        />
        DB jokes
      </Typography>
    </>
  );
}
