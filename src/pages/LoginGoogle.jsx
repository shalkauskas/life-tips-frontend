import AuthService from "../services/AuthService";
import Container from "@material-ui/core/Container";
export default function LoginGoogle(props) {
  const loginGoogle = () => {
    AuthService.loginGoogle().then((response) => {
      console.log(response);
    });
  };
  return (
    <Container style={{ marginTop: "2rem", textAlign: "center" }}>
      <a
        href={`${process.env.REACT_APP_SERVER}/auth/google`}
        onClick={loginGoogle}
      >
        <img src="google-login.svg" alt="google login" width="300px" />
      </a>
    </Container>
  );
}
