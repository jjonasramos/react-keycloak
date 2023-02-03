import Keycloak from "keycloak-js";

type KeycloakConfig = {
  realm: string;
  "auth-server-url": string;
  "ssl-required": string;
  resource: string;
  "public-client": boolean;
  "confidential-port": number;
}

const keycloakConfig: KeycloakConfig = {
  "realm": "cluster",
  "auth-server-url": "http://localhost:8080/auth/",
  "ssl-required": "external",
  "resource": "newhub",
  "public-client": true,
  "confidential-port": 0
}

export const keycloak = Keycloak({
  url: keycloakConfig["auth-server-url"],
  realm: keycloakConfig.realm,
  clientId: keycloakConfig.resource
});

export const initKeycloak: Keycloak.KeycloakInitOptions = {
  onLoad: "login-required",
  checkLoginIframe: false,
  pkceMethod: "S256",
  flow: "standard",
};