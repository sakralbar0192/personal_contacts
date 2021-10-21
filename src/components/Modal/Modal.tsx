import { FC } from 'react';
import { IContact } from '../../interfaces/interfaces';
import { validateNamefield, validateTelfield } from '../../util/util';
import AppButton from '../UI/AppButton/AppButton';
import AppInput from '../UI/AppInput/AppInput';
import cl from './modal.module.scss'

interface modalProps {
    isItNewContact: boolean
    isModalActive: boolean
    setModalActive: (b:boolean)=>void
    contact: IContact
    setContact: (c:IContact)=> void
    handleSubmit: (e:React.FormEvent<HTMLFormElement>)=>Promise<void>
    isContactNumberExist: boolean
    setContactNumberExist:(b:boolean)=>void
}

const Modal:FC<modalProps> = ({isItNewContact, isModalActive, setModalActive, contact, setContact, handleSubmit, isContactNumberExist, setContactNumberExist}) => {
    
    enum contactFields {
        name = "name",
        number = "number"         
    }

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>):void {
        const target = e.target
        const name = target.name
        const value = target.value
        if (name === contactFields.name) {
            const validatedValue = validateNamefield(value)
            setContact({...contact, name: validatedValue})
        }else if (name === contactFields.number) {
            const validatedValue = validateTelfield(value)
            setContact({...contact, number: validatedValue})
        }              
    }    

    return (
        <div 
            className={isModalActive ? [cl.modal, cl.open].join(' ') : cl.modal} 
            onClick={()=> {setModalActive(false);}}
        >
            <div 
                className={isModalActive ? [cl.modal__content, cl.open].join(' ')  : cl.modal__content}  
                onClick={e => e.stopPropagation()} 
            >
                <h2>{isItNewContact
                        ?   isContactNumberExist
                            ?   'Sorry, but a contact with this number already exists'
                            :   'Please provide the name and number of the contact'
                        :   isContactNumberExist
                            ?   'Sorry, but a contact with this number already exists'
                            :   'Please make the necessary changes'
                }</h2>
                {isContactNumberExist
                    ? <AppButton type="button" onClick={()=> {
                        setContactNumberExist(false)
                    }} >Try again</AppButton>
                    :   <form className={cl.modal__filling} onSubmit={handleSubmit}>
                            <AppInput 
                                type="text" 
                                required name={contactFields.name} 
                                placeholder="enter contact name"  
                                value={contact.name}
                                onChange={handleInputChange}
                            />
                            <AppInput 
                                type="text" 
                                required name={contactFields.number} 
                                placeholder="enter contact number" 
                                value={contact.number}
                                onChange={handleInputChange}
                            />
                            <AppButton type="submit">
                                {isItNewContact
                                    ?   '+ Add contact'
                                    :   'Edit contact'
                                }
                            </AppButton>
                        </form> 
                }               
            </div>
            
        </div>
    )
}

export default Modal;
