import { Link, useHistory } from 'react-router-dom';
import cl from './MainPage.module.scss';
import AppButton from '../../components/UI/AppButton/AppButton';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MainPage = () => {
    const {setHaveAccount, isUserAuth, user, setUser, setUserAuth} = useContext(AppContext)
    const router = useHistory()

    return (
        <div className={cl.mainPage}>
            <h1>Welcome to personal contacts app!</h1>
            {isUserAuth
                ?   <div className={cl.mainPage__innerWrapper}>
                        <AppButton 
                            type="button" 
                            onClick={()=> {
                                router.push(`/${user.login}/contacts`)
                            }
                        }> 
                            To contacts!
                        </AppButton>

                        <Link 
                            to="/main"
                            onClick={()=> {
                                setUserAuth(false)
                                localStorage.removeItem('isUserAuth')
                                setUser({login: '',password: ''})
                            }
                        }>
                            Log out
                        </Link> 
                    </div>
                :   <div className={cl.mainPage__innerWrapper} >
                        <AppButton 
                            type="button" 
                            onClick={()=> {
                                setHaveAccount(false)
                                router.push("/authorization")
                            }
                        }>
                            Registration
                        </AppButton>                 
                        <Link 
                            to="/authorization"
                            onClick={()=> {
                                setHaveAccount(true)
                            }
                        }>
                            I already have an account
                        </Link>      
                    </div>
            }                        
        </div>        
    );
};

export default MainPage; 