import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function useAuth() {
  let history = useHistory();
  const { setAuthUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  // const URL = process.env.REACT_APP_URL_API
  const URL = "https://webinar-cms-blogs.herokuapp.com"

  const registerUser = async (data) => {
    const { nombre, correo, password } = data;
    let headers = {
      "Content-Type": "application/json",
    };
    console.log(URL, data)
    
    return axios
      .post(`${URL}/registro`, {
        nombre,
        correo,
        password,
      }, { headers })
      .then(async (res) => {
        setAuthUser(res.data.access_token);
        history.push("/");
      })
      .catch((err) => {
        console.log({err})
        setError(err.data);
      });
  };

  const loginUser = async (data) => {
    console.log({URL}, data)
    const { correo, password } = data;
    let headers = {
      "Content-Type": "application/json",
    };
    return axios
      .post(`${URL}/login`, {
        correo,
        password,
      }, { headers })
      .then(async (res) => {
        setAuthUser(res.data.content);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log({err})
        setError(err.data);
      });
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
