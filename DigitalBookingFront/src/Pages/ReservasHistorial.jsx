import React, { useEffect } from 'react'
import { useGlobalStates } from '../Context/global.context'
import ButtonNavigate from '../Components/ButtonNavigate'
import TitleHeader from '../Components/TitleHeader'
import { Reservashistorial } from '../Components/Reservashistorial'
import Loader from '../Components/Loader'
import { useReservasContext } from '../Context/reservascalendar'
import { useGlobalStatesAdmin } from '../Context/admin.context'
import { useParams } from 'react-router-dom'

const ReservasHistorial = () => {
    const { idUsuario } = useParams();
    const {loading} = useGlobalStates()
    const { reservasPorUsuario } = useReservasContext();
    const { listaTodosProductos } = useGlobalStatesAdmin();
    
    
    useEffect(() => {
        reservasPorUsuario(idUsuario);
        listaTodosProductos();
      }, [idUsuario]);
   
  return (

    <section>
    {loading ? <Loader/> : 
   <>
    <TitleHeader title="Reservas" />
    <ButtonNavigate />
    <Reservashistorial/>
   
 </>
    }
  
  </section>
  )
  
}

export default ReservasHistorial