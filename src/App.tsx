import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak, initKeycloak } from './utils/auth';

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initKeycloak}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ReactKeycloakProvider>
  )
}

export default App;
