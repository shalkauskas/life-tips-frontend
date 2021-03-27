import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "160px",
  },
}));
export default function SortButton(props) {
  const classes = useStyles();
  const [orderType, setOrderType] = React.useState("Date");
  const [descending, setDescending] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // reload sorting if additional content has been fetched
  React.useEffect(() => {}, [props.posts]);
  // React.useEffect(() => {
  //   setDescending(true);
  // }, [orderType]);
  const orderPublished = [...props.posts].sort((a, b) =>
    a.published === b.published ? 0 : a.published ? -1 : 1
  );
  const orderUnPublished = [...props.posts].sort((a, b) =>
    a.published === b.published ? 0 : a.published ? 1 : -1
  );
  const orderNewest = [...props.posts].sort((a, b) =>
    a.time < b.time ? 1 : -1
  );
  const orderOldest = [...props.posts].sort((a, b) =>
    a.time < b.time ? -1 : -1
  );
  const orderBest = [...props.posts].sort((a, b) =>
    a.rating < b.rating ? 1 : -1
  );
  const orderWorst = [...props.posts].sort((a, b) =>
    a.rating < b.rating ? -1 : 1
  );
  const orderAuthor = [...props.posts].sort((a, b) =>
    a.author.localeCompare(b.author, `en`, { ignorePunctuation: true })
  );
  const orderAuthorReverse = [...props.posts].sort((a, b) =>
    b.author.localeCompare(a.author, `en`, { ignorePunctuation: true })
  );
  const setOrder = (a, b, e) => {
    if (e.target.getAttribute(`id`) === orderType) {
      setDescending(!descending);
    } else {
      setOrderType(e.target.getAttribute(`id`));
      setDescending(true);
    }
    JSON.stringify(props.posts) === JSON.stringify(a)
      ? props.setPosts(b)
      : props.setPosts(a);
  };
  return (
    <div style={{ marginLeft: "1rem" }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ width: "160px" }}
        onClick={handleMenu}
      >
        Sort ({orderType})
        {descending ? <span>&#8595;</span> : <span>&#8593;</span>}
        <ExpandMore />
      </Button>
      <Menu
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        <MenuItem
          button
          id="Date"
          onClick={(e) => setOrder(orderOldest, orderNewest, e)}
        >
          Date
        </MenuItem>
        <MenuItem
          button
          id="Published"
          onClick={(e) => setOrder(orderUnPublished, orderPublished, e)}
        >
          Published
        </MenuItem>

        <MenuItem
          button
          id="Rating"
          onClick={(e) => setOrder(orderWorst, orderBest, e)}
        >
          Rating
        </MenuItem>
        {props.adminRole && (
          <MenuItem
            button
            id="Author"
            onClick={(e) => setOrder(orderAuthor, orderAuthorReverse, e)}
          >
            By author
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
