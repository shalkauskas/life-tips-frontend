export default function LoadMoreButton(props) {
  return (
    <button
      onClick={() => props.setPage(props.page + 1)}
      className={`${
        props.hasNextPage ? "" : "d-none"
      } btn btn-lg btn-outline-secondary`}
    >
      MORE!
    </button>
  );
}
