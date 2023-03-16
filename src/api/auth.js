import api from "../utils/api";

async function login({
    email, password
}) {
    const response = await api
    .post("/api/auth/login", {
      email,
      password
    });
  return response.data;
}

async function register({
  name, email, password, password_confirmation
}) {
  const response = await api
    .post("/api/auth/register", {
      name,
      email,
      password,
      password_confirmation
    });
  return response.data;
}


export const auth = {
  login,
  register
};
