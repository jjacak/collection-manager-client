import React, { FC } from 'react';
import { ComponentType, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
export interface WithRoleBasedRedirectOptions {
  role: string;
}
const roleClaimType = 'http:/collection-manager-app.com/roles';
export const withRoleBasedRedirect = <P extends object>(
  Component: ComponentType<P>,
  options: WithRoleBasedRedirectOptions
): FC<P> => (props: P): JSX.Element => {
  const navigate = useNavigate();
  const { getIdTokenClaims } = useAuth0();
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    async function getRoles(): Promise<Array<string>> {
      const claims = await getIdTokenClaims();
      return claims![roleClaimType] || [];
    }
    async function checkRoles(role: string) {
      const roles = await getRoles();
      const isAuthorized = roles.includes(role);
      if (!isAuthorized) {
       navigate('/')
      } else {
        setIsAuthorized(true);
      }
    }
    checkRoles(options.role);
  }, [getIdTokenClaims, navigate]);
  return isAuthorized ? <Component {...props} /> : <div></div>;
};