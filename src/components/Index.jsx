import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import AddJoke from "./AddJoke";
import JokesList from "./JokesList";
import DataService from "../services/DataService";
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
        if (entry.isIntersecting) {
          // props.onClick();
          // console.log("It works!");
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
    }
  }, [props, ref]);
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

  return (
    <div>
      <div className="d-flex justify-content-center list px-3">
        <div className="btn-group w-100" role="group" aria-label="Order">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            className={`btn btn-outline-secondary`}
            // onClick={() => setOrder("new")}
          >
            New
          </NavLink>
          <NavLink
            to="/best"
            activeClassName="active"
            className={`btn btn-outline-secondary`}
            // onClick={() => setOrder("best")}
          >
            Best
          </NavLink>
          <NavLink
            to="/random"
            activeClassName="active"
            className={`btn btn-outline-secondary`}
            // onClick={() => setOrder("random")}
          >
            Random
          </NavLink>

          <button
            className={`ml-5 btn btn-success ${showAdd ? "disabled" : ""}`}
            onClick={() => setShowAdd(!showAdd)}
          >
            <img
              alt="Add"
              src="/plus.svg"
              width="14px"
              height="14px"
              style={{
                filter:
                  "invert(96%) sepia(97%) saturate(12%) hue-rotate(237deg) brightness(103%) contrast(103%)",
                display: "inline-block",
                marginRight: "5px",
              }}
            />
            Add{" "}
          </button>
        </div>
      </div>
      {showAdd ? <AddJoke close={() => setShowAdd(false)} /> : null}
      <JokesList jokes={jokes} isAuthenticated={props.isAuthenticated} />
      {loading ? (
        <div className="d-flex justify-content-center mt-5 align-items-center">
          <div className="spinner-border mr-4" role="status"></div>
          <strong>Loading...</strong>
        </div>
      ) : null}
      <div className="text-center pb-3">
        <button
          ref={ref}
          onClick={() => setPage(page + 1)}
          className={`${
            hasNextPage ? "" : "d-none"
          } btn btn-lg btn-outline-secondary`}
        >
          MORE!
        </button>
      </div>
    </div>
  );
}
