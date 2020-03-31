import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { LOGIN } from "../constants/auth";

export default () => {
  const history = useHistory();
  const tuple = useMutation(LOGIN);
  const login = tuple[0];

  tuple[0] = async (...args) => {
    const result = await login(...args);
    localStorage.setItem("token", result.data.login.token);
    history.push("/");
    return result;
  };

  return tuple;
};
