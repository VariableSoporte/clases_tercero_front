import { createContext, useState } from "react";

export const UserContext = createContext();

export const usuarioVacio = {   
    id:0,
    nombre: "",
    edad: 0,
    correo: "",
    username: "",
    password:""
};

export const UserProvider = ({children}) => {
    const [usuario, setUsuario] = useState(usuarioVacio);

    return (
        <UserContext.Provider value={{usuario, setUsuario}} >
            {children}
        </UserContext.Provider>
    );

};

