import * as ac from "../types/actionConstants"; // actionConstants
import User from "../models/User";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getList } from "./shoppingActions";

interface Token {
    token:string
}

//ASYNC THUNKS

export const register = (user:User) => {
    return (dispatch:ThunkDispatch<any, any, AnyAction>) => {
        let request:Request = new Request("/register", {
            "method":"POST",
            "headers":{
                "Content-type":"application/json"
            },
            "body":JSON.stringify(user)
        })
        handleLogin(request, "register", dispatch)
    }
}

export const login = (user:User) => {
    return (dispatch:ThunkDispatch<any, any, AnyAction>) => {
        dispatch(setUsername(user.username));
        let request:Request = new Request("/login", {
            "method":"POST",
            "headers":{
                "Content-type":"application/json"
            },
            "body":JSON.stringify(user)
        })
        handleLogin(request, "login", dispatch)
    }
}

export const logout = (token:string) => {
    return (dispatch:ThunkDispatch<any, any, AnyAction>) => {
        let request:Request = new Request("/logout", {
            "method":"POST",
            "headers":{
                "token":token
            },
        })
        handleLogin(request, "logout", dispatch)
    }
}

const handleLogin = async (request:Request, act:string, dispatch:ThunkDispatch<any /*APPLICATION STATE*/, any/*ENHANCER*/, AnyAction>) => {
    dispatch(loading());
    const response = await fetch(request);
    dispatch(stopLoading())

    if(!response) {
        dispatch(logoutFailed("There was a connection problem. Logging you out."))
        return;
    }

    if(response.ok) {
        switch(act) {
            case "register":
                dispatch(registerSuccess());
                return;
            case "login":
                let temp = await response.json();
                if(!temp) {
                    dispatch(loginFailed("Failed to parse login information. Try again later."))
                    return
                }
                let data = temp as Token;
                dispatch(loginSuccess(data.token));
                dispatch(getList(data.token))
                return;
            case "logout":
                dispatch(logoutSuccess())
                return;
            default:
                return;
        }
    } else {
        let errorMessage:string = " Server responded with a status "+response.status+" "+response.statusText
        switch(act) {
            case "register":
                if(response.status === 409) {
                    dispatch(registerFailed("Username already in use"))
                    return;
                }
                dispatch(registerFailed("Register failed."+errorMessage))
                return;
            case "login":
                dispatch(loginFailed("Login failed"+errorMessage))
                return;
            case "logout":
                dispatch(logoutFailed("Server responded with a error. Logging you out"));
                return;
            default:
                return;
        }
    }
}


//ACTION CREATORS

export const loading = () => {
    return {
        type:ac.LOADING
    }
}

export const stopLoading = () => {
    return {
        type:ac.STOP_LOADING
    }
}

export const registerSuccess = () => {
    return {
        type:ac.REGISTER_SUCCESS
    }
}

export const registerFailed = (error:string) => {
    return {
        type:ac.REGISTER_FAILED,
        error:error
    }
}

const loginSuccess = (token:string) => {
    return {
        type:ac.LOGIN_SUCCESS,
        token:token
    }
}

const loginFailed = (token:string) => {
    return {
        type:ac.LOGIN_FAILED,
        token:token
    }
}

const logoutSuccess = () => {
    return {
        type:ac.LOGOUT_SUCCESS
    }
}

export const logoutFailed = (error:string) => {
    return {
        type:ac.LOGOUT_FAILED,
        error:error
    }
}

const setUsername = (user:string) => {
    return {
        type:ac.SET_USERNAME,
        user:user
    }
}