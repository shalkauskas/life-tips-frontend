export default function About() {
  return (
    <div className="jumbotron container">
      <h1 className="display-4">About this project</h1>
      <p className="lead">
        DB posts is a small platform where you can add posts, either your own or
        your favorites, so they can be rated by other people. Whether you're
        soon to be dad or just want to make your date more akward and need some
        inspiration - this might be a perfect place.
      </p>
      <hr className="my-4" />
      <p>
        If find any content offensive or rightfully yours and you want it to be
        removed, please contact me via links below.
      </p>
      <a
        href="mailto:igor.shalkauskas@gmail.com"
        target="_blank"
        rel="noreferrer"
        className="btn btn-info btn-lg m-2"
      >
        Email
      </a>
      <a
        href="https://shalkauskas.com"
        target="_blank"
        rel="noreferrer"
        className="btn btn-info btn-lg m-2"
      >
        Portfolio
      </a>
      <a
        href="https://github.com/shalkauskas"
        target="_blank"
        rel="noreferrer"
        className="btn btn-info btn-lg m-2"
      >
        GitHub
      </a>
    </div>
  );
}
