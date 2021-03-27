import PostsList from "../components/PostsList";

import React from "react";
export default function SearchResult(props) {
  console.log(props.location.state.result);
  return <div>{<PostsList posts={props.location.state.result} />}</div>;
}
