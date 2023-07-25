import React from 'react'
import TitleHeader from '../Components/TitleHeader'
import AdminGetSedes from '../Components/AdminGetSedes'
import ButtonNavigate from '../Components/ButtonNavigate'
import Loader from '../Components/Loader'
import { useGlobalStates } from '../Context/global.context'

const AdminSedes = () => {
  const {loading} = useGlobalStates()
  return (
    <section>
          {loading ? <Loader/> : 
          <>
        <TitleHeader title={'Lista de Sedes'}/>
        <ButtonNavigate />
        <AdminGetSedes/>
        </>
  }
    </section>
  )
}

export default AdminSedes