import React from "react";
import { Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken'


export const TOKEN = "token";

export const getToken = () => {
    return localStorage.getItem('token')
}

export const setToken = (token) => {
    return localStorage.setItem(TOKEN, token)
}

export const logout = () => {
    localStorage.removeItem(TOKEN)
    window.location.replace('/user/login')
}

export const login = (token, history) => {
    setToken(token);
    history.push("/dashboard")
}

const Authentication = (Component) => {
	return function WrappedComponent() {
        const token = getToken();
        if (!token) return <Redirect to="/user/login" />

		const user = jwt.decode(token)
		if (!user) logout()
		
        return <Component />
	};
};

export default Authentication;
