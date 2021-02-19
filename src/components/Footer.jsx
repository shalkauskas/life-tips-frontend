export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer
      className="bg-light position-fixed w-100 border-top"
      style={{ bottom: 0 }}
    >
      <div className="py-3 text-center text-monospace">
        Made by Ihor Shalkauskas {date}
      </div>
    </footer>
  );
}
