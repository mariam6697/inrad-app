import React, { useState } from "react";
import { Alert, Schema } from "rsuite";
import LoginDataService from "../services/LoginService";
import { StringType } from "schema-typed";
import LoginForm from "./LoginForm";

const LoginContainer = ({ setUser, setJwt }) => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const sendAccount = () => {
    if (account.username === "" || account.password === "") return;
    LoginDataService.login({
      username: account.username,
      password: account.password,
    })
      .then((res) => {
        console.log(res);
        setUser(account.username);
        setJwt(res.data);
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
      })
      .catch((res) => {
        console.log(res);
        Alert.error("Datos inválidos");
      });
  };

  const model = Schema.Model({
    username: StringType().isRequired("Este campo es requerido"),
    password: StringType().isRequired("Este campo es requerido"),
  });

  return (
    <LoginForm
      account={account}
      setAccount={setAccount}
      model={model}
      sendAccount={sendAccount}
    />
  );
};

export default LoginContainer;
