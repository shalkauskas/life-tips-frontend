import React from "react";
import DataService from "../services/DataService";
import { useHistory } from "react-router-dom";
export default function Search(props) {
  const [search, setSearch] = React.useState("");
  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };
  let history = useHistory();
  const findBySearch = (event) => {
    if (event.key === "Enter" || event.type === "click")
      DataService.findBySearch(search)
        .then((response) => {
          console.log(response);
          history.push({
            pathname: "/search",
            search: `?query=${search}`,
            state: { result: response.data.jokes },
          });
        })
        .catch((e) => {
          console.log(e);
        });
  };
  const reset = () => {
    setSearch("");
    props.setShowSearch(false);
    // history.push("/");
  };
  return (
    <div
      className={`input-group input-group-sm `}
      style={{ transition: "all 2s", width: props.showSearch ? "100%" : "0px" }}
    >
      <form className="form-inline">
        <input
          style={{ maxWidth: "60%" }}
          type="text"
          className="form-control form-control-sm"
          placeholder=""
          value={search}
          onChange={onChangeSearch}
          onKeyPress={findBySearch}
        />

        <div className="input-group-append ">
          <button
            className="close bg-white border-right-0 border border-secondary px-1"
            aria-label="Close"
            onClick={reset}
          >
            <span aria-hidden="true" className="bg-white">
              &times;
            </span>
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            type="button"
            onClick={findBySearch}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
