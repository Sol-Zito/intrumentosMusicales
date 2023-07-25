import React, { useEffect } from "react";
import { useGlobalStates } from "../Context/global.context";
import CategoryList from "../Components/CategoryList";
import Search from "../Components/Search";
import LoaderPrincipal from "../Components/LoaderPrincipal";
import Recomendaciones from "../Components/Recomendaciones";
import ResultadoBusqueda from "../Components/ResultadoBusqueda";
import { ciudadesContext } from "../Context/ciudades.context";

const Home = () => {
  const { ciudadesState,  } = ciudadesContext();
  const { flagProduct, pageProduct, flagCategory, loading, getProductList, getCategorys   } = useGlobalStates();

  useEffect(() => {
    getCategorys();
      getProductList();
    
  }, [flagCategory, flagProduct, pageProduct]);


 

  return (
    <>
      <Search />

      {loading ? (
        <LoaderPrincipal />
      ) : (
        <>
          <CategoryList />
          {ciudadesState.resultado.length <= 0 ? (
            <Recomendaciones />
          ) : (
            <ResultadoBusqueda />
          )}
        </>
      )}
    </>
  );
};

export default Home;
