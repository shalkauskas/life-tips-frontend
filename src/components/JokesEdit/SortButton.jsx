import React from "react";
export default function SortButton(props) {
  const [dropdown, setDropdown] = React.useState(false);
  const [orderType, setOrderType] = React.useState("Date");
  const [descending, setDescending] = React.useState(true);
  // reload sorting if additional content has been fetched
  React.useEffect(() => {}, [props.jokes]);
  // React.useEffect(() => {
  //   setDescending(true);
  // }, [orderType]);
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
  const setOrder = (a, b, e) => {
    if (e.target.getAttribute(`id`) === orderType) {
      setDescending(!descending);
    } else {
      setOrderType(e.target.getAttribute(`id`));
      setDescending(true);
    }
    JSON.stringify(props.jokes) === JSON.stringify(a)
      ? props.setJokes(b)
      : props.setJokes(a);
  };
  return (
    <div className="dropdown ml-4">
      <button
        style={{ width: "160px" }}
        onClick={() => setDropdown(!dropdown)}
        className="btn btn-sm btn-info dropdown-toggle px-3"
        type="button"
      >
        Sort ({orderType}){" "}
        {descending ? <span>&#8595;</span> : <span>&#8593;</span>}
      </button>
      <div className={`${dropdown ? "d-block" : ""} dropdown-menu`}>
        <button
          id="Date"
          className="dropdown-item"
          onClick={(e) => setOrder(orderOldest, orderNewest, e)}
        >
          Date
        </button>
        <button
          id="Published"
          className="dropdown-item"
          onClick={(e) => setOrder(orderUnPublished, orderPublished, e)}
        >
          Published
        </button>

        <button
          id="Rating"
          className="dropdown-item"
          onClick={(e) => setOrder(orderWorst, orderBest, e)}
        >
          Rating
        </button>
        {props.adminRole ? (
          <button
            id="Author"
            className="dropdown-item"
            onClick={(e) => setOrder(orderAuthor, orderAuthorReverse, e)}
          >
            By author
          </button>
        ) : null}
      </div>
    </div>
  );
}
