import Typography from "@material-ui/core/Typography";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { grey, yellow } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    flexShrink: 0,
    marginRight: "0.5rem",
    color: grey[50],
    textDecoration: "none",
    "&:hover": {
      color: grey[300],
      textDecoration: "none",
    },
  },
}));
export default function HeaderBrand(props) {
  const classes = useStyles();
  const { focus } = props;
  return (
    <>
      <Typography
        variant="h6"
        className={classes.title}
        to="/"
        component={Link}
      >
        <EmojiObjectsIcon
          style={{
            marginRight: "0.5rem",
            fontSize: "2rem",
            verticalAlign: "bottom",
            color: yellow[500],
          }}
        />
        {focus ? "LPT" : "Life Pro Tips"}
      </Typography>
    </>
  );
}
