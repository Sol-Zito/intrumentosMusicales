import React from 'react'
import TitleHeader from '../Components/TitleHeader'
import ButtonNavigate from '../Components/ButtonNavigate'
import AdminGetCity from '../Components/AdminGetCity'
import Loader from "../Components/Loader";
import { useGlobalStates } from '../Context/global.context';

const AdminGetCiudades = () => {
  const {loading} = useGlobalStates()
  return (

    <section>
    {loading ? <Loader/> : 
  <>
    <TitleHeader title="Lista de Ciudades" />
   <ButtonNavigate />
   <AdminGetCity/>
   </>
 }
  </section>

  )
}

export default AdminGetCiudades