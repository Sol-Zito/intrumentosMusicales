import React  from "react";
import TitleHeader from "../Components/TitleHeader";
import ButtonNavigate from "../Components/ButtonNavigate";
import FormProduct from "../Components/FormProduct";

const AdminRegisterProduct = () => {

  return (
    <section>
      <TitleHeader title={"CREAR PRODUCTO"} />
      <ButtonNavigate />
      <FormProduct/>
    </section>
  );
};
export default AdminRegisterProduct;
