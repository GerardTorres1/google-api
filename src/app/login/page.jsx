"use client"
import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const clientID = "559738721487-4o1hi1opjd0ngoitkqrp0ko4ed4ccpqn.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    setIsLoggedIn(true);
    setUserInfo(res.profileObj);
  };

  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  };

  return (
    <>
      <h1>Login with Google</h1>
      <GoogleLogin
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
      {isLoggedIn && (
        <div>
          <h1>Gracias por iniciar sesión</h1>
          <p>Nombre: {userInfo.name}</p>
          <p>Correo: {userInfo.email}</p>
          <p>Imagen: {userInfo.imageUrl}</p>
          <a href={userInfo.imageUrl} >
            <img src={userInfo.imageUrl} alt="profile" />
          </a>
        </div>
      )}
    </>
  );
}

export default Page;
