"use client";
import React, { useEffect } from 'react'
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';

function page() {

  const clientID = "559738721487-4o1hi1opjd0ngoitkqrp0ko4ed4ccpqn.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: clientID,
      });
    }
    gapi.load("client:auth2", start)
  }, [])

  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
  }

  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  }
  

  return (
    <>
      <h1>Loggin with Google</h1>
      <GoogleLogin
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </>

  )
}

export default page