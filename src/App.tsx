import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from './pages/MainPage/MainPage';
import UserContactsPage from './pages/UserContactsPage/UserContactsPage';
import cl from './app.module.scss'
import { useLayoutEffect, useState } from 'react';
import { IContext, IUser } from './interfaces/interfaces';
import { AppContext } from './context/AppContext';
import UsersService from './API/UsersService';
import { useFetching } from './hooks/useFetching';
import Loader from './components/Loader/Loader';

function App() {
  const [haveAccount, setHaveAccount] = useState<boolean>(false)
  const [isUserAuth, setUserAuth] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>({login: '', password: ''} )

  const [checkAuth, isLoading, LoadingError] = useFetching(async ()=> {
    const isUserAlredyAuth:boolean = (localStorage.getItem('isUserAuth') !== null )
      ? true
      : false
    setUserAuth(isUserAlredyAuth)
    if (isUserAlredyAuth) {
      const authUserId = localStorage.getItem('userId')
      const authUser:IUser = (authUserId!==null) ? await UsersService.getOne(authUserId) : {login: '', password: ''}
      setUser(authUser)      
    }
  })

  useLayoutEffect(()=> {
    checkAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])  

  const contextValue: IContext = {
    haveAccount: haveAccount,
    setHaveAccount: setHaveAccount,
    isUserAuth: isUserAuth,
    setUserAuth: setUserAuth,
    user: user,
    setUser: setUser
  }

  

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter> 
        <div className={cl.app}>
          {isLoading
            ? <Loader />
            : LoadingError
              ? <h1>Sory somethong went wrong... {LoadingError}</h1>
              : isUserAuth
                ? <Switch>        
                    <Route path="/main">
                      <MainPage />
                    </Route>
                    <Route exact path="/:name/contacts">
                      <UserContactsPage />
                    </Route>
                    <Redirect to="/main" />
                  </Switch>
                : <Switch>
                    <Route path="/main">
                      <MainPage />
                    </Route>
                    <Route path="/authorization">
                        <AuthPage />
                    </Route>
                    <Redirect to="/main" />
                  </Switch>
          }
          </div>
      </BrowserRouter> 
    </AppContext.Provider>
  );
}

export default App;
