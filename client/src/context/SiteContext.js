import { useState, createContext } from 'react';
import fetcher     from '../functions/fetcher';

const SiteContext = createContext();

const SiteContextProvider = ({ children }) => {

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ busy,     setBusy     ] = useState(false);
  const [ token,    setToken    ] = useState(null);
  const [ user,     setUser     ] = useState(null);  // { name, email, avatar }

  const doLogin = async (user, password) => {
    console.log('doLogin called in context', user, password);
    setBusy(true);
    const loginResponse = await fetcher('/user/login', token, { user, password });
    setBusy(false);
    console.log('loginResponse', loginResponse);
    if (loginResponse.success && loginResponse.token) {
      setLoggedIn(true);
      setToken(loginResponse.token);
      setUser(loginResponse.userDetails);
    } else {
      alert('COULD NOT LOG IN');
    }
  }

  const doLogout = async () => {
    console.log('doLogout called in context');
    setBusy(true);
    const logoutResponse = await fetcher('/user/logout', token);
    // get rid of the token/user state
    setToken(false);
    setUser(false);
    console.log('logoutResponse', logoutResponse);
    setBusy(false);
  }

  const doStatus = async () => {
    console.log('doStatus called in context');
    setBusy(true);
    const statusResponse = await fetcher('/user/status', token);
    setBusy(false);
    console.log('statusResponse', statusResponse);
  }

  const doTest = async () => {
    console.log('doTest called in context');
    setBusy(true);
    const testResponse = await fetcher('/api/test', token);
    setBusy(false);
    console.log('testResponse', testResponse);
  }

  return (
    <SiteContext.Provider value={{ loggedIn, busy, user, doLogin, doLogout, doStatus, doTest }}>
      {children}
    </SiteContext.Provider>
  )
};

export default SiteContext;
export { SiteContextProvider };
