import React from "react";
export default function SortButton(props) {
  const [dropdown, setDropdown] = React.useState(false);
  const orderPublished = [...props.jokes].sort((a, b) =>
    a.published === b.published ? 0 : a.published ? -1 : 1
  );
  const orderUnPublished = [...props.jokes].sort((a, b) =>
    a.published === b.published ? 0 : a.published ? 1 : -1
  );
  const orderNewest = [...props.jokes].sort((a, b) =>
    a.time < b.time ? 1 : -1
  );
  const orderOldest = [...props.jokes].sort((a, b) =>
    a.time < b.time ? -1 : -1
  );
  const orderBest = [...props.jokes].sort((a, b) =>
    a.rating < b.rating ? 1 : -1
  );
  const orderWorst = [...props.jokes].sort((a, b) =>
    a.rating < b.rating ? -1 : 1
  );
  const orderAuthor = [...props.jokes].sort((a, b) =>
    a.author.localeCompare(b.author, `en`, { ignorePunctuation: true })
  );
  const orderAuthorReverse = [...props.jokes].sort((a, b) =>
    b.author.localeCompare(a.author, `en`, { ignorePunctuation: true })
  );
  const setOrder = (a, b) => {
    JSON.stringify(props.jokes) === JSON.stringify(a)
      ? props.setJokes(b)
      : props.setJokes(a);
  };
  return (
    <div className="dropdown ml-4">
      <button
        onClick={() => setDropdown(!props.dropdown)}
        className="btn btn-sm btn-info dropdown-toggle"
        type="button"
      >
        Sort
      </button>
      <div className={`${dropdown ? "d-block" : ""} dropdown-menu`}>
        <button
          className="dropdown-item"
          onClick={() => setOrder(orderOldest, orderNewest)}
        >
          Date
        </button>
        <button
          className="dropdown-item"
          onClick={() => setOrder(orderUnPublished, orderPublished)}
        >
          Published
        </button>

        <button
          className="dropdown-item"
          onClick={() => setOrder(orderWorst, orderBest)}
        >
          Rating
        </button>
        <button
          className="dropdown-item"
          onClick={() => setOrder(orderAuthor, orderAuthorReverse)}
        >
          By author
        </button>
      </div>
    </div>
  );
}
