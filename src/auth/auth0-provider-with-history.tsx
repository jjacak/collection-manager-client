import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import {propsChildren} from '../ts/types'

const Auth0ProviderWithHistory:React.FC<propsChildren> = (props) => {
  const domain:any = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId:any = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience:any = process.env.REACT_APP_AUTH0_AUDIENCE;

  const navigate = useNavigate();

  const onRedirectCallback = (appState:any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      // audience={audience}
    >
      {props.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;