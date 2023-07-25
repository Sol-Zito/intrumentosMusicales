import React, { useEffect } from 'react'
import AdminGetUsers from '../Components/AdminGetUsers'
import TitleHeader from "../Components/TitleHeader";
import { useGlobalStates } from '../Context/global.context';
import Loader from '../Components/Loader';
import { useGlobalStatesAuth } from '../Context/auth.context';
import ButtonNavigate from '../Components/ButtonNavigate';
import ResultsSearchUsers from '../Components/ResultsSearchUsers';
import SearchUser from '../Components/SearchUser';


const AdminGetUser = () => {
  const {loading, flagUser} = useGlobalStates()
  const {getUsers, pageUser, usersCorreo} = useGlobalStatesAuth();
  


  useEffect(()=> {
   getUsers() 
  }, [flagUser, pageUser])



  return (
    <section>
    
    {loading ? <Loader/> : 
    <>
         <TitleHeader title="LISTA DE USUARIOS" />
         <ButtonNavigate/>
         <SearchUser/>
        { usersCorreo ? 
         <ResultsSearchUsers/>
         :
        <AdminGetUsers/>  
        }
        </>

  }
    </section>
    
  )
}

export default AdminGetUser