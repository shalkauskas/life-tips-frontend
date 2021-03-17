import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { green, grey } from "@material-ui/core/colors";
export default function AddButton(props) {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      backgroundColor: props.showAdd ? green[300] : green[500],
      color: grey[50],
      "&:hover": {
        backgroundColor: green[300],
      },
    },
  }));
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      size="large"
      className={classes.button}
      endIcon={<Icon>add_circle</Icon>}
      onClick={() => props.setShowAdd(!props.showAdd)}
    >
      Add
    </Button>
  );
}
