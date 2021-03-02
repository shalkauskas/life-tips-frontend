import { Link } from "react-router-dom";
export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer
      className="bg-light position-absolute w-100 border-top"
      style={{ bottom: 0 }}
    >
      <div className="py-3 text-center text-monospace">
        Made by Ihor Shalkauskas © {date}
        <div style={{ fontSize: "14px" }}>
          <Link to="/about" className="text-muted">
            <u>About</u>
          </Link>
          <a
            href="https://shalkauskas.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted mx-3"
          >
            <u>Portfolio</u>
          </a>
          <a
            href="https://github.com/shalkauskas"
            target="_blank"
            rel="noreferrer"
            className="text-muted"
          >
            <u>GitHub</u>
          </a>
        </div>
      </div>
    </footer>
  );
}
