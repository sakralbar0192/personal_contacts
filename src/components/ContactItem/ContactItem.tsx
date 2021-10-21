import React, { FC, useContext } from 'react';
import UsersService from '../../API/UsersService';
import { AppContext } from '../../context/AppContext';
import { IContact, IUser } from '../../interfaces/interfaces';
import cl from './contactItem.module.scss';

interface IContactItemProps {
    contact: IContact
    contacts: IContact[]|undefined
    setModalActive: (b:boolean)=>void
    setItNewContact: (b:boolean)=>void
    setContact: (c:IContact)=>void
    setNumberEditedContact: (s:string)=> void
    setContactNumberExist: (b:boolean)=> void
}

const ContactItem: FC<IContactItemProps> = ({contact, contacts, setItNewContact, setModalActive, setContact, setNumberEditedContact, setContactNumberExist}) => {

    const {user, setUser} = useContext(AppContext)

    async function deleteContactHandler():Promise<void> {
        
        const contactsWithoutDeletedContact:IContact[]|undefined = contacts?.length
            ?   contacts.filter(contactsItem=> {
                    return contact.number !== contactsItem.number
                })
            :   undefined
        
        const newUser:IUser = await UsersService.updateUser({...user, contacts: contactsWithoutDeletedContact})
        setUser(newUser)
         
    }

    async function editContactHandler():Promise<void> {
        setItNewContact(false)
        setModalActive(true)
        setContact({name: contact.name, number: contact.number})
        setNumberEditedContact(contact.number)
        setContactNumberExist(false)
    }
    

    return (
        <li className={cl.contactItem}>
            <a href = {`tel:${contact.number}`} className={cl.contactItem__innerWrapper}>
                <h3>{contact.name}:</h3>
                <p>{contact.number}</p>
            </a>
            <button onClick={deleteContactHandler}>Delete contact</button> 
            <button onClick={editContactHandler}>Edit contact</button> 
        </li>
    );
};

export default ContactItem; 