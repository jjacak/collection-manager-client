import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { withRoleBasedRedirect } from "./with-role-based-redirect";
export const RoleProtectedRoute = ({ component, role}: any) =>
 { if (role) {
    const Component = withAuthenticationRequired(withRoleBasedRedirect(component, {role}),{
        onRedirecting: () => <p>Loading...</p>,
      })
      return <Component />;
 } else {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <p>Loading...</p>,
      });
      return <Component />;
 } 
  }