import UsersService from "../API/UsersService";
import { IUser } from "../interfaces/interfaces";

export async function checkUserUniqueness(user:IUser): Promise<boolean> {
    const users = await UsersService.getAll()
    const existingUser = users.find(usersItem => {
        return usersItem.login === user.login
    })
    if (existingUser !==undefined) {
        return true
    } 
    return false    
}

export async function checkPassword(user:IUser): Promise<IUser|undefined> {
    const users = await UsersService.getAll()
    const checkingUser:IUser|undefined = users.find(usersItem => {
        return (usersItem.login === user.login &&
             user.password === usersItem.password)
    }) 
    return checkingUser
}

export function checkContactNumberUniqueness(contactNumber:string, user: IUser):boolean {
    const sameNumber = (user.contacts?.length) 
        ? user.contacts.find(contact=> {
            return contact.number === contactNumber
        }) 
        : undefined;

    if (sameNumber === undefined)  {
        return false
    } 
    return true
} 

export function validateTelfield (value: string): string {
    let inputNumbersValue = value.replace(/\D/g, '');
    let formatedInputValue = '';

    if (!inputNumbersValue) {
        return value = '';
    }    

    if (['7', '8'].includes(inputNumbersValue[0])) {
        const firstSimbols = inputNumbersValue[0] === '8' ? '8' : '+7';
        formatedInputValue = firstSimbols + ' ';

        if (inputNumbersValue.length > 1) {
        formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }

        if (inputNumbersValue.length >= 5) {
        formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }

        if (inputNumbersValue.length >= 8) {
        formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }

        if (inputNumbersValue.length >= 10) {
        formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
    } else {
        formatedInputValue = '+7' + inputNumbersValue;
    }     
    return formatedInputValue
};


export function validateNamefield (value: string): string {
    const formatedValue = value.length === 0
        ?   ''
        :   value.length >= 15 
            ?   value[0].toUpperCase() + value.slice(1,14)
            :   value[0].toUpperCase() + value.slice(1)
    return formatedValue
}