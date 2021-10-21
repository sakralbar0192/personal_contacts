import { IUser } from "../interfaces/interfaces"

const serverUrl = 'https://immense-basin-29416.herokuapp.com'

export default class UsersService {    

    static async getAll():Promise<IUser[]> {
        const response = await fetch(`${serverUrl}/users`)
        const body = await response.json()  
        return body   
    } 

    static async getOne(id:string):Promise<IUser> {
        const response = await fetch(`${serverUrl}/users/${id}`)
        const body = await response.json()  
        return body   
    }

    static async createUser(user:IUser):Promise<IUser> {
        const response = await fetch(`${serverUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })  
        const createdUser:IUser = await response.json()
        return createdUser
    }    

 

    static async updateUser(user:IUser): Promise<IUser> {
        const response = await fetch(`${serverUrl}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const updatedUser:IUser = await response.json()
        return updatedUser         
    }
}