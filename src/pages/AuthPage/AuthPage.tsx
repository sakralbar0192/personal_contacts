import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UsersService from '../../API/UsersService';
import AppButton from '../../components/UI/AppButton/AppButton';
import AppInput from '../../components/UI/AppInput/AppInput';
import { AppContext } from '../../context/AppContext';
import { checkPassword, checkUserUniqueness } from '../../util/util';
import cl from './authPage.module.scss'

const AuthPage = () => {
    enum inputsName {login = 'login', password = 'password'}

    const {haveAccount, setUserAuth, user, setUser} = useContext(AppContext)
    const [isUserExist, setUserExist] = useState<boolean>(false)
    const [isPasswordIncorrect, setPasswordIncorrect] = useState<boolean>(false)
    
    const router = useHistory()

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>):void {
        const target = e.target
        const name = target.name
        const value = target.value
        name === inputsName.login
            ?   setUser({...user, login: value})
            :   setUser({...user, password: value})        
    }

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>): Promise<any> {
        e.preventDefault();
        if (haveAccount) {
            const chekingUser = await checkPassword(user)
            if (chekingUser !== undefined) {
                setPasswordIncorrect(false) 
                setUser(chekingUser)
                setUserAuth(true) 
                localStorage.setItem('isUserAuth','true')
                localStorage.setItem('userId',`${chekingUser.id}`) 
                router.push(`/${user.login}/contacts`)
            }else {
                setPasswordIncorrect(true)
            }
        } else {
            const isUserExist = await checkUserUniqueness(user)
            if (isUserExist) {
                setUserExist(true) 
            } else {
                setUserExist(false) 
                const createdUser = await UsersService.createUser(user)                
                setUser(createdUser)
                setUserAuth(true)
                localStorage.setItem('isUserAuth','true')
                localStorage.setItem('userId',`${createdUser.id}`)
                router.push(`/${user.login}/contacts`)
            }
        }
          
    }

    return (
        <div className={cl.authPage}>
            <h1>{haveAccount 
                ? 'Welcome back!'
                : 'Welcome!'
            }</h1>
            <p>{haveAccount
                ?   isPasswordIncorrect
                        ?   'Incorrect password or login, check this out and try again'
                        :   'Enter your login and password, please'
                :   isUserExist
                        ?   'Such a user already exists!!!'
                        :   'Come up with a username and password' 
            }</p>           
            
            <form onSubmit={handleSubmit}>
                <AppInput 
                    type="text" 
                    placeholder="enter your login"
                    required
                    name={inputsName.login}
                    value={user.login}
                    onChange={handleInputChange}
                />
                <AppInput 
                    type="password" 
                    placeholder="enter your password" 
                    required
                    name={inputsName.password}
                    value={user.password}
                    onChange={handleInputChange}
                    />
                <AppButton 
                    type="submit"
                >{haveAccount
                    ?   'Log in'
                    :   'Registation'
                }</AppButton>
            </form>

            <Link to="/main">Back to main</Link>            
        </div>           
    );
};

export default AuthPage;