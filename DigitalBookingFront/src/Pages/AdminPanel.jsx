import React, {useEffect} from "react";
import ButtonNavigate from "../Components/ButtonNavigate";
import TableAdmin from "../Components/TableAdmin";
import { useGlobalStates } from "../Context/global.context";
import Loader from "../Components/Loader";
import { useGlobalStatesAdmin } from "../Context/admin.context";
import TitleHeader from "../Components/TitleHeader";




const AdminPanel = () => {
  const {loading,  flagProduct, pageProduct} = useGlobalStates()
  const {getProductListTodos} = useGlobalStatesAdmin()

  useEffect(() => {
    getProductListTodos()
}, [flagProduct, pageProduct])

   return (
    <section>
      {loading ? <Loader/> : 
    <>
      <TitleHeader title="LISTA DE PRODUCTOS" />
     <ButtonNavigate />
     <TableAdmin /> 
     </>
   }
    </section>
  );
};

export default AdminPanel;
