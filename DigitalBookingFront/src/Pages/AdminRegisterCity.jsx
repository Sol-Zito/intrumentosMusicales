import React, { useState } from 'react'
import FormCity from '../Components/FormCity'
import TitleHeader from '../Components/TitleHeader'
import ButtonNavigate from '../Components/ButtonNavigate'

const AdminRegisterCity = () => {

  const [coordenadas, setCoordenadas] = useState({lat: '-31,4841484', lng: '-64,5368143'})
  return (
    <section>
    <TitleHeader title={'Crear Sede'} />
    <ButtonNavigate/>
    <FormCity/>
   
    </section>
  )
}

export default AdminRegisterCity