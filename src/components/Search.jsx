import React from "react";

export default function Search(props) {
  return (
    <div className="input-group input-group-sm">
      <form className="form-inline">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder=""
          value={props.search}
          onChange={props.onChangeSearch}
        />

        <div className="input-group-append ">
          <button
            className="close bg-white border-right-0 border border-secondary px-1"
            aria-label="Close"
            onClick={props.reset}
          >
            <span aria-hidden="true" className="bg-white">
              &times;
            </span>
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            type="button"
            onClick={props.findBySearch}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
