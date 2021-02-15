import React from "react";

export default function Search(props) {
  return (
    <div className="input-group input-group-sm">
      <input
        type="text"
        className="form-control"
        placeholder=""
        value={props.search}
        onChange={props.onChangeSearch}
      />

      <div className="input-group-append">
        <button
          className="close bg-white px-1"
          aria-label="Close"
          onClick={props.reset}
        >
          <span aria-hidden="true" className="bg-white">
            &times;
          </span>
        </button>
        <button
          className="btn btn-outline-secondary ml-2"
          type="button"
          onClick={props.findBySearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
