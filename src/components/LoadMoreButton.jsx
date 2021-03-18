import Button from "@material-ui/core/Button";
export default function LoadMoreButton(props) {
  return (
    <Button
      variant="outlined"
      size="large"
      onClick={() => props.setPage(props.page + 1)}
      style={{ display: !props.hasNextPage && "none" }}
    >
      View more
    </Button>
  );
}
