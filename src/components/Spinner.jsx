export default function Spinner(props) {
  return (
    <>
      {props.loading ? (
        <div className="d-flex justify-content-center mt-5 align-items-center">
          <div className="spinner-border mr-4" role="status"></div>
          <strong>Loading...</strong>
        </div>
      ) : null}
    </>
  );
}
