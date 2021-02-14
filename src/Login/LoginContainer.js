import React, {useEffect, useState} from "react";
import {Alert, Schema} from "rsuite";
import LoginDataService from "../services/LoginService";
import {StringType} from "schema-typed";
import LoginForm from "./LoginForm";

const LoginContainer = ({setUser}) => {
    const [account, setAccount] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        setCSRF();
    }, []);

    const setCSRF = () => {
        LoginDataService.getCSRF().then(res => console.log(res))
    }

    const sendAccount = () => {
        if (account.username === "" || account.password === "")
            return;
        LoginDataService.login(
            {
                username: account.username,
                password: account.password
            }
        ).then(res => {
            console.log(res);
            setUser(account.username);
        }).catch(res => {
                console.log(res);
                Alert.error('Datos inválidos');
            }
        )
    };

    const model = Schema.Model({
        username: StringType().isRequired('Este campo es requerido'),
        password: StringType().isRequired('Este campo es requerido')
    });

    return (
        <LoginForm account={account} setAccount={setAccount} model={model} sendAccount={sendAccount}/>
    );
};

export default LoginContainer;
