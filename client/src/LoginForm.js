import { useState } from 'react';

const LoginForm = ({ onSubmit, busy }) => {

  const [ user,     setUser     ] = useState('');
  const [ password, setPassword ] = useState('');

  // declare a "_" (local) version of onSubmit to check our form before we submit
  // this is a convenient naming convention to show that the two functions are linked somehow
  const _onSubmit = (evt) => {
    evt.preventDefault();
    // do some client-side validation
    if (user.length < 4)     { alert('user must be at least 4 chars!'); return false; }
    if (password.length < 4) { alert('password must be at least 4 chars!'); return false; }
    onSubmit(user, password);
  }

  return (
    <div>
      <form>
        <div>
          <div style={{ display: 'inline-block', width: '80px' }}>User:</div>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'inline-block', width: '80px' }}>Password:</div>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{ marginTop: '10px' }}>
          {busy ? (
            <span>Please wait...</span>
          ):(
            <button type="button" onClick={_onSubmit}>Login</button>
          )}
        </div>
      </form>
    </div>
  )
};

export default LoginForm;
