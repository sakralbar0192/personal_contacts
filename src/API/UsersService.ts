import { IUser } from "../interfaces/interfaces"

export default class UsersService {    

    static async getAll():Promise<IUser[]> {
        const response = await fetch('http://localhost:3001/users')
        const body = await response.json()  
        return body   
    } 

    static async getOne(id:string):Promise<IUser> {
        const response = await fetch(`http://localhost:3001/users/${id}`)
        const body = await response.json()  
        return body   
    }

    static async createUser(user:IUser):Promise<IUser> {
        const response = await fetch('http://localhost:3001/users', {
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
        const response = await fetch(`http://localhost:3001/users/${user.id}`, {
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