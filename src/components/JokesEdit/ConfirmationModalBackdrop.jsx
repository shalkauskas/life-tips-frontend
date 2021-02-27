export default function ConfirmationModalBackdrop(props) {
  return (
    <div
      onClick={() => props.setShowConfirm(false)}
      style={
        props.showConfirm
          ? {
              filter: "blur(4px)",
              opacity: "0.3",
              backgroundColor: "steelblue",
              bottom: "0",
              display: "block",
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: "10",
            }
          : { display: "none" }
      }
    />
  );
}
