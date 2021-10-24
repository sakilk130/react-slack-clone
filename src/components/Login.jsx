import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/Login.css';
import { auth, provider } from '../firebase/config';
import { useStateValue } from '../context-api/StateProvider';
import { actionTypes } from '../context-api/reducer';

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
          alt=""
        />
        <h1>Sign in to Slack Clone</h1>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
