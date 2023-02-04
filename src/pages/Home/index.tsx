import { useEffect, useState } from "react";
import { useAuthentication } from "../../contexts/Authentication";

const Home: React.FC = () => {
  const { keycloakConnection, onLogout } = useAuthentication();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    keycloakConnection.loadUserInfo().then((userInfoRes: any) => {
      setUserInfo(userInfoRes);
    });
  }, []);

  if(!userInfo) 
    return <div>Loading...</div>

  return (
    <div>
      <h1>Realm: {keycloakConnection?.realm}</h1>
      <h1>UserID: {userInfo.sub}</h1>
      <h1>User Email: {userInfo.email}</h1>
      <h1>User Name: {userInfo.given_name}</h1>
      <h1>Token: {keycloakConnection.token}</h1>

      <button 
        className="bg-purple-600 px-4 py-2 rounded-md text-white" 
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;