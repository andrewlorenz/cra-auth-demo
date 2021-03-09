import useSiteContext from './hooks/useSiteContext';
import LoginForm      from './LoginForm';

import './App.css';

function App() {

  const { loggedIn, user, busy, doLogin, doLogout, doStatus, doTest } = useSiteContext();

  return (
    <div className="App">
      <h1>Welcome to my CRA JWT Auth Application</h1>
      {loggedIn ? (
        <div>
          {user && (
            <p className="para-logged-in">You are a logged in user - {user.name} / {user.email}</p>
          )}
          {busy ? (
            <span>Please wait...</span>
          ):(
            <button type="button" className="logout" onClick={doLogout}>Logout</button>
          )}
        </div>
      ):(
        <div>
          <p className="para-not-logged-in">You are not currently logged in</p>
          <LoginForm onSubmit={doLogin} busy={busy} />
        </div>
      )}
      <div style={{ marginTop: '50px' }}>
        <button type="button" onClick={doStatus}>Check Status</button>
        <span style={{ marginLeft: '50px' }} />
        <button type="button" onClick={doTest}>Test Call</button>
      </div>
    </div>
  );
}

export default App;
