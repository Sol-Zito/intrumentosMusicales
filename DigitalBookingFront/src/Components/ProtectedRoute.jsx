import React, { useContext, useEffect } from 'react'
import { LocalStorageContext } from "../Context/auth.services";
import { Navigate, Outlet } from 'react-router-dom';




const ProtectedRoute = ({ children}) => {
    const {userRol}= useContext(LocalStorageContext);
    
switch (userRol){
    case 1:
        return children ? children : <Outlet/>
        
    case 2:
        return <Navigate to="/"/>
         
}

}

export default ProtectedRoute