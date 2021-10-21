export interface IUser {
    login: string
    password: string
    contacts?: IContact[]
    id?:number
}

export interface IContext {
    haveAccount: boolean
    setHaveAccount: (b:boolean)=> void
    isUserAuth: boolean
    setUserAuth: (b:boolean)=> void 
    user: IUser    
    setUser: (user:IUser) => void
}

export interface IContact {
    name: string
    number: string
}

