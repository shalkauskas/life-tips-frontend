export default function AddButton(props) {
  return (
    <button
      className={`ml-5 btn btn-success ${props.showAdd ? "disabled" : ""}`}
      onClick={() => props.setShowAdd(!props.showAdd)}
    >
      <img
        alt="Add"
        src="/plus.svg"
        width="14px"
        height="14px"
        style={{
          filter:
            "invert(96%) sepia(97%) saturate(12%) hue-rotate(237deg) brightness(103%) contrast(103%)",
          display: "inline-block",
          marginRight: "5px",
        }}
      />
      Add{" "}
    </button>
  );
}
