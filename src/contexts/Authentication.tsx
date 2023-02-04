import { createContext, useContext, useState } from "react";
import Keycloak from 'keycloak-js';
import { keycloakConfig } from "../utils/auth";

interface AuthenticationContextData {
  isAuthenticated: boolean;
  onAuthenticate: (keycloak: any) => void;
  keycloakConnection: any;
  verifyRealmLocalStorage: () => Promise<void>;
  onLogout: () => void;
  onLogin: (realm: string) => void;
}

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

const AuthenticationContext = createContext({} as AuthenticationContextData);

function AuthenticationProvider ({ children }: AuthenticationProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloakConnection, setKeycloakConnection] = useState<any>(null);

  const onAuthenticate = (keycloak: any) => {
    setIsAuthenticated(true);
    setKeycloakConnection(keycloak);
  };

  const verifyRealmLocalStorage = () => new Promise<void>((resolve, reject) => {
    const realmLocalStorage = window.localStorage.getItem("nh-realm") || "";

    if (realmLocalStorage) {
      const keycloak = Keycloak({
        url: keycloakConfig["auth-server-url"],
        realm: realmLocalStorage,
        clientId: keycloakConfig.resource
      });

      keycloak.init({ onLoad: 'login-required', redirectUri: 'http://localhost:3000' }).then(() => {
        onAuthenticate(keycloak);
        resolve();
      })
    } else {
      reject();
    }
  });

  const onLogout = () => {
    window.localStorage.removeItem("nh-realm");
    keycloakConnection!.logout();
    setIsAuthenticated(false);
    setKeycloakConnection(null);
  }

  const onLogin = (realm: string) => {
    const keycloak = Keycloak({
      url: keycloakConfig["auth-server-url"],
      realm: realm,
      clientId: keycloakConfig.resource
    });

    window.localStorage.setItem("nh-realm", realm);

    keycloak.init({ onLoad: 'login-required', redirectUri: 'http://localhost:3000' }).then(() => {
      onAuthenticate(keycloak);
    })
  }

  return (
    <AuthenticationContext.Provider value={{
      isAuthenticated, 
      onAuthenticate, 
      keycloakConnection, 
      verifyRealmLocalStorage, 
      onLogout, 
      onLogin
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

function useAuthentication() {
  const context = useContext(AuthenticationContext);

  return context;
}

export { AuthenticationContext, AuthenticationProvider, useAuthentication };