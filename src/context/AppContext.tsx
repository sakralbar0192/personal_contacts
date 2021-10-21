import { createContext } from "react";
import { IContext } from '../interfaces/interfaces'

const defaultState: IContext = {
    haveAccount: false,
    setHaveAccount: ()=>{},
    isUserAuth: false, 
    setUserAuth: ()=>{},
    user: {login: '', password: ''},
    setUser: () => {}
}

export const AppContext = createContext<IContext>(defaultState);