import React from "react";
import { useLocation, Link } from "react-router-dom";
import AddJoke from "../components/AddJoke";
import JokesList from "../components/JokesList";
import DataService from "../services/DataService";
import Spinner from "../components/Spinner";
import LoadMoreButton from "../components/LoadMoreButton";
import AddButton from "../components/AddButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
export default function Index(props) {
  const [jokes, setJokes] = React.useState([]);
  const [showAdd, setShowAdd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("new");

  // infinite scroll
  const ref = React.useRef();
  let location = useLocation();
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          // setPage((prevValue) => prevValue + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    } else if (!hasNextPage) {
      observer.unobserve(ref.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, props, ref]);
  React.useEffect(() => {
    location.pathname === "/"
      ? setOrder("new")
      : location.pathname === "/best"
      ? setOrder("best")
      : setOrder("random");
    setJokes([]);
    setPage(0);
  }, [location]);
  React.useEffect(() => {
    setLoading(true);
    async function fetchJokes() {
      await DataService.getAllPublished(page, order)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setHasNextPage(response.data.hasNextPage);
          setJokes((prevState) => [...prevState, ...response.data.jokes]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchJokes();
  }, [page, order]);
  // Tabs
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="d-flex justify-content-center list px-3">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label=" New" to="/" component={Link} />
          <Tab label="Best" to="/best" component={Link} />
          <Tab label="Random" to="/random" component={Link} />
        </Tabs>

        <AddButton showAdd={showAdd} setShowAdd={setShowAdd} />
      </div>
      <Collapse in={showAdd}>
        <AddJoke close={() => setShowAdd(false)} />
      </Collapse>
      <JokesList jokes={jokes} isAuthenticated={props.isAuthenticated} />
      <Spinner loading={loading} />

      <div className={`${loading ? "d-none" : ""} text-center pb-3`} ref={ref}>
        <LoadMoreButton
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}
