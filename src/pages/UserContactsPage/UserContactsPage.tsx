import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import AppButton from '../../components/UI/AppButton/AppButton';
import { AppContext } from '../../context/AppContext';
import cl from './userContactsPage.module.scss'
import {IContact, IUser} from '../../interfaces/interfaces'
import UsersService from '../../API/UsersService';
import ContactItem from '../../components/ContactItem/ContactItem';
import { checkContactNumberUniqueness } from '../../util/util';
import AppSelect from '../../components/UI/AppSelect/AppSelect';
import AppInput from '../../components/UI/AppInput/AppInput';

const UserContactsPage = () => {
    enum sortTypes {
        name='name',
        number='number',
    }

    const {setUserAuth, user, setUser} = useContext(AppContext)
    const [isModalActive, setModalActive] = useState<boolean>(false)
    const [contact, setContact] = useState<IContact>({name: '',number: ''})
    const [isContactNumberExist, setContactNumberExist] = useState<boolean>(false)
    const [isItNewContact, setItNewContact] = useState<boolean>(true)
    const [numberEditedContact, setNumberEditedContact] = useState<string>('')
    const [selectedSort, setSelectedSort] = useState<sortTypes>(sortTypes.name)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const sortedAndSearchedContacts:IContact[]|undefined = useMemo(()=> {
        const sort = selectedSort
        if (user.contacts!==undefined) {
            if (searchQuery!=='') {
                const searchedContacts:IContact[] = [...user.contacts].filter(contact => {
                    return contact[sort].toLowerCase().includes(searchQuery)
                })            
                return searchedContacts
            }
            return user.contacts            
        }
        return undefined        
    }, [selectedSort, user.contacts, searchQuery])

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (isItNewContact) {
            const isContactExist = checkContactNumberUniqueness(contact.number, user)
            if (isContactExist) {
                setContactNumberExist(true)
            }else {
                user.contacts !== undefined
                    ?   user.contacts.push(contact)
                    :   user.contacts = [contact]
                const updatedUser:IUser = await UsersService.updateUser(user)
                setUser(updatedUser)  
                setModalActive(false)       
                setContact({name: '', number: ''})          
            } 
        } else {
            const isContactExist = checkContactNumberUniqueness(contact.number, user)
            if (isContactExist) {
                setContactNumberExist(true)
            } else {
                const contactsWithoutEditedContact:IContact[]| [] = user.contacts!==undefined
                    ?   user.contacts.filter(contactsItem=> {
                            return numberEditedContact !== contactsItem.number
                        })
                    :   []  
                contactsWithoutEditedContact.push(contact)            
                const newUser:IUser = await UsersService.updateUser({...user, contacts: contactsWithoutEditedContact})
                setUser(newUser) 
                setModalActive(false)       
                setContact({name: '', number: ''})
            }
        } 
        
    }

    

    function selectChangeHandler(e:React.ChangeEvent<HTMLSelectElement>):void {
        const sort = e.target.value
        if (sort === sortTypes.name) {
            setSelectedSort(sortTypes.name)            
        }else if (sort === sortTypes.number) {
            setSelectedSort(sort)   
        }
    }

    function searchInputHandler(e:React.ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value
        setSearchQuery(value)
    }

    return (
        <div className={cl.userContactsPage}>            
            <Link                 
                to="/main"
                onClick={()=> {
                    setUserAuth(false)
                    localStorage.removeItem('isUserAuth')
                    setUser({login: '', password: ''})
                }
            }>
                Log out
            </Link>
            <h1>Glad to see you {user.login}</h1> 
            <AppButton 
                type="button" 
                onClick={()=> {
                    setModalActive(true)
                    setItNewContact(true)
                    setContactNumberExist(false)
                    setContact({name: '', number: ''})
                }}
            >
                + Add new contact
            </AppButton>
            {user.contacts!==undefined && user.contacts?.length >=6 
                ?   <div className={cl.userContactsPage__searchAndSortWrapper}>
                        <h2 style={{textAlign:"center"}}>Don't want to scroll, - find it!</h2>
                        <label>Choose where to search
                            <AppSelect 
                                options={[{name: 'name', value: 'name'},{name: 'number', value: 'number'}]}
                                value={selectedSort}
                                onChange={selectChangeHandler}
                            />
                        </label>
                        <AppInput 
                            type="search"
                            placeholder="enter search query"
                            value={searchQuery}
                            onChange={searchInputHandler}
                        />
                    </div>
                : null
            }
            

            <div className={cl.userContactsPage__listWrapper}>
                <ul>
                    {sortedAndSearchedContacts !== undefined
                        ?   sortedAndSearchedContacts.map(contact=> {
                                return(
                                    <ContactItem 
                                        key={contact.number} 
                                        contact={contact} 
                                        contacts={user.contacts} 
                                        setModalActive={setModalActive}
                                        setItNewContact={setItNewContact}
                                        setContact={setContact}
                                        setNumberEditedContact={setNumberEditedContact}
                                        setContactNumberExist={setContactNumberExist}
                                    />
                            )
                            })
                        : null  
                    }
                </ul>
            </div>

            <Modal 
                isItNewContact={isItNewContact}
                isModalActive={isModalActive}
                setModalActive={setModalActive}
                contact={contact}
                setContact={setContact}
                handleSubmit={handleSubmit}
                isContactNumberExist={isContactNumberExist}
                setContactNumberExist={setContactNumberExist}
            />
        </div>
    );
};

export default UserContactsPage;