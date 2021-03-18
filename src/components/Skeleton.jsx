import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  skeleton: {
    marginTop: "1rem",
    marginBottom: "1rem",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
export default function Spinner(props) {
  const classes = useStyles();
  return (
    <>
      <Skeleton
        variant="rect"
        width={600}
        height={208}
        className={classes.skeleton}
      />
      <Skeleton
        variant="rect"
        width={600}
        height={208}
        className={classes.skeleton}
      />
      <Skeleton
        variant="rect"
        width={600}
        height={208}
        className={classes.skeleton}
      />
      <Skeleton
        variant="rect"
        width={600}
        height={208}
        className={classes.skeleton}
      />
    </>
  );
}
