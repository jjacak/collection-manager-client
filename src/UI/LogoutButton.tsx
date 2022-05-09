import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "./Button";
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const {t}=useTranslation();

  return (
    <Button  className = 'button--alt' onClick={() => logout({ returnTo: window.location.origin })}>
      {t("log_out")}
    </Button>
  );
};

export default LogoutButton;