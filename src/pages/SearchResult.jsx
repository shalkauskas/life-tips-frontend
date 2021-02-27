import JokesList from "../components/JokesList";

import React from "react";
export default function SearchResult(props) {
  console.log(props.location.state.result);
  return <div>{<JokesList jokes={props.location.state.result} />}</div>;
}
