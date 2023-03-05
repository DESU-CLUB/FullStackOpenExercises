import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  console.log(credentials);
  const loginDetails = await axios.post(baseUrl, credentials);
  console.log(loginDetails);
  return loginDetails;
};

export default { login };
