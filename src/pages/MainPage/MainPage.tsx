import { Link, useHistory } from 'react-router-dom';
import cl from './MainPage.module.scss';
import AppButton from '../../components/UI/AppButton/AppButton';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MainPage = () => {
    const {setHaveAccount, isUserAuth, user, setUser, setUserAuth} = useContext(AppContext)
    const router = useHistory()

    function toContactButtonOnClickHandler(e:React.MouseEvent<HTMLButtonElement>):void {
        router.push(`/${user.login}/contacts`)
    }

    function registrationButtonOnClickHandler(e:React.MouseEvent<HTMLButtonElement>):void {
        setHaveAccount(false)
        router.push("/authorization")
    }

    function alredyHaveAccountLinkonClickHandler():void {
        setHaveAccount(true)
    }

    function logOutLinkOnClickHandler():void {
        setUserAuth(false)
        localStorage.removeItem('isUserAuth')
        setUser({login: '',password: ''})
    }

    return (
        <div className={cl.mainPage}>
            <h1>Welcome to personal contacts app!</h1>
                <div className={cl.mainPage__innerWrapper}>
                    <AppButton 
                        type="button" 
                        onClick={isUserAuth 
                            ? toContactButtonOnClickHandler 
                            : registrationButtonOnClickHandler}
                    > 
                        {isUserAuth ? 'To contacts!': 'Registration'}
                    </AppButton>

                    <Link 
                        to={isUserAuth ? '/main' : '/authorization'}
                        onClick={isUserAuth
                            ?   logOutLinkOnClickHandler
                            :   alredyHaveAccountLinkonClickHandler
                        }
                    >
                        {isUserAuth ? 'Log out' : 'I already have an account'}
                    </Link> 
                </div>                                           
        </div>        
    );
};

export default MainPage; 