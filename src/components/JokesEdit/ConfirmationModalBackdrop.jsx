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
              top: "0",
              left: "0",
              display: "block",
              position: "fixed",
              width: "100%",
              height: "100vh",
              minHeight: "100%",
              zIndex: "10",
            }
          : { display: "none" }
      }
    />
  );
}
