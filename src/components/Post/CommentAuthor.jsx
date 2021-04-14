import AuthService from "../../services/AuthService";
import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles((theme) => ({
  authorWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
    alignItems: "center",
  },
  authorName: {
    marginLeft: "10px",
  },
}));
export default function CommentsPreview(props) {
  const classes = useStyles();
  const { user, time } = props;
  const [userdata, setUserdata] = React.useState([]);
  React.useEffect(() => {
    async function fetch() {
      await AuthService.findUser(user)
        .then((response) => {
          console.log(response);
          // console.log(response.data.comments);
          setUserdata(response.data.user);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetch();
  }, [user]);
  return (
    <Container className={classes.authorWrapper} disableGutters>
      <div className={classes.author}>
        <Avatar src={userdata.photoUrl} alt="user profile pic">
          <AccountCircle />
        </Avatar>
        <Typography className={classes.authorName}>
          {userdata.displayName}
        </Typography>
      </div>

      <Typography>{time}</Typography>
    </Container>
  );
}
