import React from 'react'
import TitleHeader from '../Components/TitleHeader'
import ButtonNavigate from '../Components/ButtonNavigate'
import AdminCategoryList from '../Components/AdminCategoryList'
import { useGlobalStates } from '../Context/global.context'

const AdminGetCategories = () => {
    const {loading} = useGlobalStates()
  return (
    <section>
          <TitleHeader title="Lista de Categorías"/>
           <ButtonNavigate />
           <AdminCategoryList/>
    </section>
  )
}

export default AdminGetCategories