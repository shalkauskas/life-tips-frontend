import React, { useState, useEffect, useRef } from "react";
import AddJoke from "../../components/AddJoke";
import ConfirmationModal from "../../components/JokesEdit/ConfirmationModal";
import ConfirmationModalBackdrop from "./ConfirmationModalBackdrop";
import SortButton from "./SortButton";
import JokesEditAllButtons from "../../components/JokesEdit/JokesEditAllButtons";
import Spinner from "../../components/Skeleton";
import LoadMoreButton from "../LoadMoreButton";
import AddButton from "../../components/AddButton";
import Joke from "../../components/Joke";
import DataService from "../../services/DataService";

export default function JokeEditList(props) {
  const [jokes, setJokes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [page, setPage] = useState(0);
  const ref = useRef();
  useEffect(() => {
    async function fetchJokes() {
      setLoading(true);
      await DataService.getAll(page, "new")
        .then((response) => {
          setLoading(false);
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          setJokes((prevState) => [...prevState, ...response.data.jokes]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchJokes();
  }, [page]);
  useEffect(() => {
    async function fetchJokes() {
      setLoading(true);
      await DataService.getAll(0, "new")
        .then((response) => {
          setLoading(false);
          console.log(response);
          setHasNextPage(response.data.hasNextPage);
          setJokes([...response.data.jokes]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (props.update) {
      setJokes([]);
      fetchJokes();
    }
  }, [props.update]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          setPage((prevValue) => prevValue + 1);
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
  }, [hasNextPage, ref]);
  const setActiveJoke = (joke, index) => {
    props.setCurrentJoke(joke);
    setCurrentIndex(index);
    props.setMessage("");
  };
  return (
    <div className="col-lg-6 col-12">
      <div className="d-flex justify-content-center my-3">
        <h4 className="text-center">
          {props.adminRole ? "All jokes" : "My Jokes"}
        </h4>
        <SortButton
          jokes={jokes}
          setJokes={setJokes}
          adminRole={props.adminRole}
        />
      </div>

      <div
        className="border p-3"
        style={{
          height: "63vh",
          overflowY: "auto",
          direction: "rtl",
        }}
      >
        {jokes.map((joke, index) => (
          <div
            key={index}
            onClick={() => setActiveJoke(joke, index)}
            style={{ direction: "ltr" }}
            className={`
                ${index === currentIndex ? "border border-warning " : ""} mb-3`}
          >
            <Joke
              content={joke.content}
              author={joke.author}
              id={joke.id}
              rating={joke.rating}
              time={joke.time}
              allowRate={true}
            />
          </div>
        ))}
        <Spinner loading={loading} />
        <div
          ref={ref}
          style={{ direction: "ltr" }}
          className="text-center pb-3"
        >
          <LoadMoreButton
            hasNextPage={hasNextPage}
            page={page}
            setPage={setPage}
          />
        </div>
        {jokes.length < 1 ? (
          <div style={{ direction: "ltr" }}>
            <h5 className="alert alert-warning text-center">
              You don't have any added content yet. Want to submit a joke?
              <AddButton showAdd={showAdd} setShowAdd={setShowAdd} />
            </h5>
            {showAdd ? <AddJoke close={() => setShowAdd(false)} /> : null}
          </div>
        ) : null}
      </div>
      <ConfirmationModal
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        refreshList={props.refreshList}
      />
      <JokesEditAllButtons
        adminRole={props.adminRole}
        jokes={jokes}
        setShowConfirm={setShowConfirm}
        refreshList={props.refreshList}
        setMessage={props.setMessage}
      />
      <ConfirmationModalBackdrop
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
      />
    </div>
  );
}
