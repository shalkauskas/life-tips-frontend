export default function authHeader() {
  const user = localStorage.getItem("loggedin");

  if (user) {
    return { "x-access-token": user };
  } else {
    return {};
  }
}
