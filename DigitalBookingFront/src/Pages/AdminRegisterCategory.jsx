import React from "react";
import TitleHeader from "../Components/TitleHeader";
import ButtonNavigate from "../Components/ButtonNavigate";
import FormCategory from "../Components/FormCategory";

const AdminRegisterCategory = () => {

  return (
    <section>
      <TitleHeader title={"CREAR CATEGORÍA"} />
      <ButtonNavigate />
      <FormCategory/>
    </section>
  );
};
export default AdminRegisterCategory;
