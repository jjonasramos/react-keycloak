import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthentication } from "../../contexts/Authentication";
import Keycloak from 'keycloak-js';
import { keycloakConfig } from "../../utils/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

type Inputs = {
  realm: string,
  realmRequired: string,
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { onAuthenticate, isAuthenticated, keycloakConnection, verifyRealmLocalStorage, onLogin } = useAuthentication();

  const onSubmit: SubmitHandler<Inputs> = data => {
    onLogin(data.realm);
  };

  useEffect(() => {
    verifyRealmLocalStorage();
  }, []);

  if (isAuthenticated && keycloakConnection) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input 
          placeholder="Realm" 
          defaultValue="" {...register("realm")} 
          className="border border-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-2 ease-linear" 
        />
        {errors.realmRequired && <span>This field is required</span>}
        <button 
          type="submit" 
          className="bg-purple-700 mt-5 px-6 py-3 rounded-lg text-white hover:bg-purple-600 transition duration-2 ease-linear"
        >
          Logar
        </button>
      </form>
    </div>
  );
};

export default Login;